/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RiderCreateDto } from '../dto/create-..dto';
import { UpdateRiderDTO } from '../dto/update.rider';
import { RiderEntityRepository } from './rider.repository';

@Injectable()
export class RidersService {

  constructor(private riderEntityRepository: RiderEntityRepository) { }

  create(createDto: RiderCreateDto): Promise<RiderCreateDto> {
    return this.riderEntityRepository.createLog(createDto);
  }

  findAll() {
    return this.riderEntityRepository.findAll();
  }

  findOne(id: number) {
    return this.riderEntityRepository.findLogById(id);
  }

  update(updateDto: UpdateRiderDTO) {
    return this.riderEntityRepository.updateRider(updateDto);
  }

  remove(id: number) {
    return `This action removes a #${id} `;
  }
}
