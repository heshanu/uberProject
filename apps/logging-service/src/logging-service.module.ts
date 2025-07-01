/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LoggingServiceController } from './logging-service.controller';
import { LoggingServiceService } from './logging-service.service';
import { LogginEntity } from './logginEntity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('TypeOrmConfig');
        const connectionUrl = configService.get<string>('DB_HOST');

        if (!connectionUrl) {
          logger.error('DB_HOST is missing in environment variables');
          throw new Error('Database connection URL not configured');
        }

        try {
          const url = new URL(connectionUrl);
          const isServerless = configService.get<string>('SERVERLESS', 'false') === 'true';
          const usePooler = configService.get<string>('NODE_ENV') === 'production' || isServerless;

          if (usePooler) {
            if (!url.hostname.includes('-pooler')) {
              url.hostname = url.hostname.replace('.neon.tech', '-pooler.neon.tech');
            }
            url.searchParams.set('pgbouncer', 'true');
            logger.log('Using Neon connection pooler');
          }

          url.searchParams.set('keepalives', '1');
          url.searchParams.set('keepalives_idle', '30');
          url.searchParams.set('keepalives_interval', '10');
          url.searchParams.set('keepalives_count', '5');

          return {
            type: 'postgres',
            url: url.toString(),
            ssl: { rejectUnauthorized: false },
            entities: [LogginEntity],
            synchronize: configService.get<string>('NODE_ENV') !== 'production',
            logging: ['error', 'warn'],
            autoLoadEntities: true,
            extra: {
              connectionTimeoutMillis: 30000,
              idleTimeoutMillis: 60000,
              max: 5,
              sslmode: 'require',
              ...(isServerless && {
                keepAlive: true,
                keepAliveInitialDelayMillis: 10000,
              }),
            },
          };
        } catch (error) {
          logger.error(`Invalid DB_HOST: ${connectionUrl}`, error.stack);
          throw new Error('Invalid database connection URL format');
        }
      },
      dataSourceFactory: async (options: any) => {
        const logger = new Logger('DataSource');
        const maxRetries = 3;
        const retryDelay = 5000; // 5 seconds
        let attempt = 1;

        while (attempt <= maxRetries) {
          try {
            logger.log(`Connecting to database (attempt ${attempt}/${maxRetries})...`);
            const dataSource = await new DataSource(options).initialize();
            logger.log('Database connected successfully');
            return dataSource;
          } catch (error) {
            logger.error(`Connection attempt ${attempt} failed: ${error.message}`);
            if (attempt < maxRetries) {
              logger.warn(`Retrying in ${retryDelay / 1000} seconds...`);
              await new Promise(resolve => setTimeout(resolve, retryDelay));
              attempt++;
            } else {
              logger.error(`Database connection failed after ${maxRetries} attempts`);
              throw error;
            }
          }
        }
        throw new Error('Database connection failed after maximum retries');
      },
    }),
  ],
  controllers: [LoggingServiceController],
  providers: [LoggingServiceService],
})

export class LoggingServiceModule implements OnApplicationShutdown {
  private readonly logger = new Logger(LoggingServiceModule.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) { }

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Application shutting down (${signal})...`);
    if (this.dataSource.isInitialized) {
      try {
        await this.dataSource.destroy();
        this.logger.log('Database connection closed');
      } catch (error) {
        this.logger.error(`Error closing database connection: ${error.message}`);
      }
    }
  }
}


