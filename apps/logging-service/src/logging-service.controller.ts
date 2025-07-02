/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { LoggingServiceService } from './logging-service.service';
import { LoggingRequest } from './loggerModel';
import { LoggingResponse } from './loggingResponse';
@Controller("/logger")
export class LoggingServiceController {
  constructor(private readonly loggingServiceService: LoggingServiceService) { }

  @Get('/get')
  sayHi(): string {
    return "hi";
  }

  @Post()
  saveLogger(@Body() notificationRequest: LoggingRequest): Promise<LoggingResponse> {
    return this.loggingServiceService.saveLogging(notificationRequest);
  }

  @Get()
  getLogging(): Promise<LoggingRequest[]> {
    return this.loggingServiceService.findAll();
  }

  @Get('/:id')
  getLogById(@Param("id") id: number): Promise<LoggingRequest | null> {
    return this.loggingServiceService.findById(id);
  }
}
