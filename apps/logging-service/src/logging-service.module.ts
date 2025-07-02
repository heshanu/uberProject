/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LoggingServiceController } from './logging-service.controller';
import { LoggingServiceService } from './logging-service.service';
import { LogginEntity } from './logginEntity';
import { LogginEntityRepository } from './loggin-entity.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([LogginEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('TypeOrmConfig');

        // Get environment variables with proper validation
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT', 5432);
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_DATABASE');
        const synchronize = configService.get('DB_SYNCHRONIZE', 'false') === 'true';
        const logging = configService.get('DB_LOGGING', 'false') === 'true';

        // Validate required configuration
        if (!host || !username || !database) {
          logger.error(`Missing required database configuration`);
          throw new Error('Database configuration incomplete');
        }

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [LogginEntity],
          synchronize,
          logging,
          extra: {
            connectionLimit: 10,
            idleTimeoutMillis: 30000,
          },
        };
      },
    }),
  ],
  controllers: [LoggingServiceController],
  providers: [LoggingServiceService, LogginEntityRepository],
})
export class LoggingServiceModule implements OnApplicationShutdown {
  private readonly logger = new Logger(LoggingServiceModule.name);

  constructor(
    private readonly dataSource: DataSource,
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