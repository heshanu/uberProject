/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingServiceService {
  getHello(): string {
    return 'Logiing service! Works';
  }
}
