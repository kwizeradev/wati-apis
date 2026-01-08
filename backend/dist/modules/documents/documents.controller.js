"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const documents_validator_1 = require("./documents.validator");
class DocumentsController {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    createAndSend = async (req, res) => {
        const dto = (0, documents_validator_1.validateCreateDocumentRequest)(req.body);
        const result = await this.documentsService.createPdfAndSend(dto);
        return res.status(201).json({
            data: {
                referenceId: result.referenceId,
                status: 'sent',
            },
        });
    };
}
exports.DocumentsController = DocumentsController;
