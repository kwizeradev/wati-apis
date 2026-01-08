"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const documents_routes_1 = require("./modules/documents/documents.routes");
const error_middleware_1 = require("./middlewares/error.middleware");
function buildApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: env_1.env.FRONTEND_ORIGIN ?? true,
    }));
    app.use(express_1.default.json({ limit: '1mb' }));
    app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));
    app.use('/api/documents', (0, documents_routes_1.buildDocumentsRouter)());
    app.use(error_middleware_1.errorMiddleware);
    return app;
}
