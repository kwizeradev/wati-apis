"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDocumentsRouter = buildDocumentsRouter;
const express_1 = require("express");
const documents_controller_1 = require("./documents.controller");
const documents_service_1 = require("./documents.service");
function buildDocumentsRouter() {
    const router = (0, express_1.Router)();
    const service = new documents_service_1.DocumentsService();
    const controller = new documents_controller_1.DocumentsController(service);
    router.post('/send', (req, res, next) => {
        controller.createAndSend(req, res).catch(next);
    });
    return router;
}
