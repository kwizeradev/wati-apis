"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdfToCloudinary = uploadPdfToCloudinary;
const stream_1 = require("stream");
const cloudinary_config_1 = __importDefault(require("./cloudinary.config"));
const errors_1 = require("../../utils/errors");
async function uploadPdfToCloudinary(options) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_config_1.default.uploader.upload_stream({
            resource_type: 'auto',
            public_id: options.publicId || options.fileName.replace('.pdf', ''),
            folder: 'wati-documents',
            overwrite: true,
        }, (error, result) => {
            if (error) {
                reject(new errors_1.IntegrationError('Failed to upload PDF to Cloudinary'));
            }
            else if (result) {
                resolve({
                    secureUrl: result.secure_url,
                    publicId: result.public_id,
                });
            }
        });
        const readable = stream_1.Readable.from([options.fileBuffer]);
        readable.pipe(uploadStream);
    });
}
