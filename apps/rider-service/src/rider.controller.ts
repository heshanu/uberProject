/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiderCreateDto } from '../dto/create-..dto';
import { RidersService } from './rider.service';
import { UpdateRiderDTO } from '../dto/update.rider';


@Controller("rider")
export class RidersController {

  constructor(private service: RidersService) { }

  @Post()
  create(@Body() createDto: RiderCreateDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateDto: UpdateRiderDTO) {
    return this.service.update(updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
