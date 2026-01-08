"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function formatMeta(meta) {
    if (!meta)
        return '';
    try {
        return ` ${JSON.stringify(meta)}`;
    }
    catch {
        return '';
    }
}
exports.logger = {
    info(message, meta) {
        console.log(`[INFO] ${new Date().toISOString()} ${message}${formatMeta(meta)}`);
    },
    warn(message, meta) {
        console.warn(`[WARN] ${new Date().toISOString()} ${message}${formatMeta(meta)}`);
    },
    error(message, meta) {
        console.error(`[ERROR] ${new Date().toISOString()} ${message}${formatMeta(meta)}`);
    },
};
