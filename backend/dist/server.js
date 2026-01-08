"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
const app_1 = require("./app");
const app = (0, app_1.buildApp)();
if (process.env.NODE_ENV !== 'production') {
    app.listen(env_1.env.PORT, () => {
        logger_1.logger.info(`Server listening on port ${env_1.env.PORT}`);
    });
}
exports.default = app;
