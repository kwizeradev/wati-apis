"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateDocumentRequest = validateCreateDocumentRequest;
const zod_1 = require("zod");
const errors_1 = require("../../utils/errors");
const whatsappNumberSchema = zod_1.z
    .string()
    .min(6)
    .max(20)
    .regex(/^[0-9]+$/, 'WhatsApp number must contain digits only (include country code).');
const createDocumentSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(80),
    whatsappNumber: whatsappNumberSchema,
    description: zod_1.z.string().min(3).max(1000),
    referenceId: zod_1.z.string().min(2).max(50),
    amount: zod_1.z.coerce.number().positive().max(10_000_000),
});
function validateCreateDocumentRequest(input) {
    const result = createDocumentSchema.safeParse(input);
    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(' ');
        throw new errors_1.ValidationError(message);
    }
    return result.data;
}
