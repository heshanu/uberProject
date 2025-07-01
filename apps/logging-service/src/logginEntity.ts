/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class LogginEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ default: false })
    isRead: boolean;

    @Column({ nullable: true })
    relatedEntityId: number; // ID of the related entity (e.g., a post, comment, etc.)

    @Column({ nullable: true })
    relatedEntityType: string; // Type of the related entity (e.g., 'Post', 'Comment')

    @Column({ nullable: true })
    actionUrl: string; // URL to redirect the user when the notification is clicked

    @Column({ nullable: true })
    recipient: string; // The user who receives the notification

    @CreateDateColumn()
    createdAt: Date;
}