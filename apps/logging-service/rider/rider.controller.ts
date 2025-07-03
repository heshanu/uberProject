/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { RiderRequestDTO } from './riderRequest';

@Controller('rider-coordination')
export class RiderController {
    @Get()
    getRiderCoordinates(): string {
        return "hi"
    }

    @Post()
    saveRiderCoordinations(@Body() riderRequestDTO: RiderRequestDTO) {
        return riderRequestDTO;
    }
}
