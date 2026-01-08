"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
function errorMiddleware(err, _req, res, _next) {
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
            },
        });
    }
    logger_1.logger.error('Unhandled error', { err });
    return res.status(500).json({
        error: {
            message: 'Internal server error',
        },
    });
}
