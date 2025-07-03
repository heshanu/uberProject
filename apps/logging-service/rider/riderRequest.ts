import { IsNotEmpty, IsNumber, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class RiderRequestDTO {

    @IsNotEmpty()
    lng: number;

    @IsNotEmpty()
    lat: number;

    @IsNotEmpty()
    riderId: string;

}
