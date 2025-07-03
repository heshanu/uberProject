/* eslint-disable prettier/prettier */
export interface RiderCreateDto {
    firstName: string;

    lastName: string;

    email: string;


    phoneNumber: string;

    accountStatus: string;


    createdAt: Date;


    updatedAt: Date;


    paymentMethodId: number;


    paymentStatus: string;

    homeAddress: string;

    workAddress: string;

    preferredVehicleType: string;

    accessibilityNeeds: string;

    averageRating: number;


    totalRides: number;


    isVerified: boolean;


    verificationDocumentId: number;
}
