"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class EchoPlugin extends types_1.TextPlugin {
    transformText(text) {
        return text;
    }
}
exports.default = EchoPlugin;
