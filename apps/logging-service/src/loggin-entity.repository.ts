/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { LogginEntity } from './logginEntity';
import { LoggingRequest } from './loggerModel';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

// Assuming you have a LogginEntity defined
@Injectable()
export class LogginEntityRepository {
    constructor(
        @InjectRepository(LogginEntity)
        private readonly repository: Repository<LogginEntity>) { }

    async findAll(): Promise<LogginEntity[]> {
        return this.repository.find();
    }

    async createLog(logData: Partial<LoggingRequest>): Promise<LogginEntity> {
        const newLog = this.repository.create(logData);
        return this.repository.save(newLog);
    }

    async findLogById(id: number): Promise<LogginEntity | null> {
        return this.repository.findOneBy({ id })
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}