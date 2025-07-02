/* eslint-disable prettier/prettier */
export interface LoggingResponse {
    success: boolean;
    message: string;
    logId?: number | string;  // Optional since it won't exist on error
    timestamp?: Date;
    error?: string;           // Only present on failures
}