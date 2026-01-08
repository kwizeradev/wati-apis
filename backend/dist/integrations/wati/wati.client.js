"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watiSendSessionFile = watiSendSessionFile;
exports.watiSendTemplate = watiSendTemplate;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const wati_config_1 = require("../../config/wati.config");
const errors_1 = require("../../utils/errors");
const watiHttp = axios_1.default.create({
    baseURL: wati_config_1.watiConfig.baseUrl,
    timeout: 30_000,
});
async function watiSendSessionFile(request) {
    const form = new form_data_1.default();
    form.append('file', request.fileBuffer, {
        filename: request.fileName,
        contentType: 'application/pdf',
    });
    const url = `/api/v1/sendSessionFile/${encodeURIComponent(request.whatsappNumber)}`;
    try {
        const response = await watiHttp.post(url, form, {
            params: request.caption ? { caption: request.caption } : undefined,
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${wati_config_1.watiConfig.token}`,
            },
            maxBodyLength: Infinity,
        });
        return response.data;
    }
    catch (error) {
        throw new errors_1.IntegrationError('Failed to send file via WATI');
    }
}
async function watiSendTemplate(request) {
    const url = `/api/v1/sendTemplateMessage`;
    try {
        const response = await watiHttp.post(url, {
            whatsappNumber: request.whatsappNumber,
            templateName: request.templateName,
            parameters: request.parameters,
        }, {
            headers: {
                Authorization: `Bearer ${wati_config_1.watiConfig.token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new errors_1.IntegrationError('Failed to send template message via WATI');
    }
}
