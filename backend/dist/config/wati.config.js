"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watiConfig = void 0;
const env_1 = require("./env");
exports.watiConfig = {
    baseUrl: env_1.env.WATI_BASE_URL,
    token: env_1.env.WATI_TOKEN,
};
