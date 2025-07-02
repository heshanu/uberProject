/* eslint-disable prettier/prettier */

export interface LoggingRequest {

    title: string;

    message: string;

    isRead: boolean;

    relatedEntityId: number; // ID of the related entity (e.g., a post, comment, etc.)

    relatedEntityType: string; // Type of the related entity (e.g., 'Post', 'Comment')

    actionUrl: string; // URL to redirect the user when the notification is clicked

    recipient: string; // The user who receives the notification
}