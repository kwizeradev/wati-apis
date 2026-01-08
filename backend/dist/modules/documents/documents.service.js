"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const pdf_generator_1 = require("../../utils/pdf.generator");
const wati_service_1 = require("../../integrations/wati/wati.service");
class DocumentsService {
    async createPdfAndSend(dto) {
        const payload = {
            ...dto,
            dateIso: new Date().toISOString(),
        };
        const { buffer, fileName } = await (0, pdf_generator_1.generateDocumentPdf)(payload);
        await (0, wati_service_1.sendPdfViaWati)({
            whatsappNumber: payload.whatsappNumber,
            fileName,
            fileBuffer: buffer,
            fullName: payload.fullName,
        });
        return { referenceId: payload.referenceId };
    }
}
exports.DocumentsService = DocumentsService;
