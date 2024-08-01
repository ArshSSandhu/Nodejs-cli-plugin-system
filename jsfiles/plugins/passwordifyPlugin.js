"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
class PasswordifyPlugin extends types_1.TextPlugin {
    transformText(text) {
        return text.replace(/./g, this.options.symbol);
    }
}
exports.default = PasswordifyPlugin;
