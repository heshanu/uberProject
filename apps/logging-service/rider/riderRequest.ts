import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export interface RiderRequestDTO {
@IsNumber()
@IsNotEmpty()
lng: number;

@IsNumber()
@IsNotEmpty()
lat: number;

@IsString()
@IsNotEmpty()
riderId: string;

}
