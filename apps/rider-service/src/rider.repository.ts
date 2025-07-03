/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RiderEntity } from "../entities/rider..entity";
import { Repository } from "typeorm";
import { RiderCreateDto } from '../dto/create-..dto';
import { UpdateRiderDTO } from "../dto/update.rider";

/* eslint-disable prettier/prettier */
@Injectable()
export class RiderEntityRepository {
    constructor(
        @InjectRepository(RiderEntity)
        private readonly repository: Repository<RiderEntity>) { }

    async findAll(): Promise<RiderEntity[]> {
        return this.repository.find();
    }

    async createLog(logData: Partial<RiderCreateDto>): Promise<RiderCreateDto> {
        const newLog = this.repository.create(logData);
        return this.repository.save(newLog);
    }

    async findLogById(id: number): Promise<RiderCreateDto | null> {
        return this.repository.findOneBy({ id })
    }

    async updateRider(updateRider: UpdateRiderDTO): Promise<RiderCreateDto> {
        const rider = await this.repository.findOne({ where: { id: updateRider.id } });
        if (!rider) {
            throw new Error()
        }
        Object.assign(rider, updateRider);
        await this.repository.save(rider);

        // Return the updated rider data
        return this.mapToRiderCreateDto(rider);
    }

    private mapToRiderCreateDto(rider: RiderEntity): RiderCreateDto {

        const riderCreateDto: RiderCreateDto = {

            firstName: rider.firstName,
            lastName: rider.lastName,
            email: rider.email,
            phoneNumber: rider.phoneNumber,
            accountStatus: rider.accountStatus,
            createdAt: new Date(),
            updatedAt: new Date(),
            paymentMethodId: rider.paymentMethodId,
            paymentStatus: rider.paymentStatus,
            homeAddress: rider.homeAddress,
            workAddress: rider.workAddress,
            preferredVehicleType: rider.preferredVehicleType,
            accessibilityNeeds: rider.accessibilityNeeds,
            averageRating: rider.averageRating,
            totalRides: rider.totalRides,
            isVerified: rider.isVerified,
            verificationDocumentId: rider.verificationDocumentId
        }
        return riderCreateDto;
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}