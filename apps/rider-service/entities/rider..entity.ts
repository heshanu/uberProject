/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class RiderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phoneNumber: string;

    @Column({ default: 'active' })
    accountStatus: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    paymentMethodId: number;

    @Column({ default: 'pending' })
    paymentStatus: string;

    @Column({ nullable: true })
    homeAddress: string;

    @Column({ nullable: true })
    workAddress: string;

    @Column({ nullable: true })
    preferredVehicleType: string;

    @Column({ nullable: true })
    accessibilityNeeds: string;

    @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
    averageRating: number;

    @Column({ default: 0 })
    totalRides: number;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    verificationDocumentId: number;
}


