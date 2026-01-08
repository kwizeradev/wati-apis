"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPdfViaWati = sendPdfViaWati;
const wati_client_1 = require("./wati.client");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const env_1 = require("../../config/env");
async function sendPdfViaWati(options) {
    const { secureUrl } = await (0, cloudinary_service_1.uploadPdfToCloudinary)({
        fileBuffer: options.fileBuffer,
        fileName: options.fileName,
    });
    return (0, wati_client_1.watiSendTemplate)({
        whatsappNumber: options.whatsappNumber,
        templateName: env_1.env.WATI_TEMPLATE_NAME,
        parameters: [
            {
                ParamName: 'PDF_FILE',
                ParamValue: secureUrl,
            },
            {
                ParamName: 'name',
                ParamValue: options.fullName,
            },
        ],
    });
}
