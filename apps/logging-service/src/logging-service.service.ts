/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { LoggingResponse } from './loggingResponse';
import { LoggingRequest } from './loggerModel';
import { LogginEntityRepository } from './loggin-entity.repository';

@Injectable()
export class LoggingServiceService {

  constructor(
    private loggingRepository: LogginEntityRepository
  ) { }

  getHello(): string {
    return 'Logiing service! Works';
  }

  async saveLogging(log: LoggingRequest): Promise<LoggingResponse> {
    try {
      // Save the log entity and get the saved instance
      const savedLog = await this.loggingRepository.createLog(log);

      // Return a proper response object
      return {
        success: true,
        message: 'Log saved successfully',
        logId: savedLog.id,  // Assuming your entity has an 'id' property
        timestamp: new Date(),
      };
    } catch (error) {
      // Handle errors and return appropriate response
      //this.logger.error('Failed to save log', error.stack);
      return {
        success: false,
        message: 'Failed to save log',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<LoggingRequest[]> {
    try {
      const loggs = await this.loggingRepository.findAll();
      // Transform each item in the array to an instance of LoggingResponse
      //  const loggsToDTO = loggs.map(log => plainToClass(LoggingRequest, log, { excludeExtraneousValues: true }));
      return loggs;
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<LoggingRequest | null> {
    try {
      const findLog = await this.loggingRepository.findLogById(id);
      return findLog;
    }
    catch (error) {
      console.log("Error finding loggerId:", id);
      throw error;
    }
  }

  async deleteById(id: number): Promise<string> {
    try {
      await this.loggingRepository.deleteById(id);
      return "log was deleted:" + id;
    }
    catch (error) {
      console.error('Error deleting log:', id);
      throw error;
    }
  }

}
