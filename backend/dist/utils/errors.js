"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class IntegrationError extends AppError {
    constructor(message = 'Integration error', statusCode = 502) {
        super(message, statusCode);
    }
}
exports.IntegrationError = IntegrationError;
