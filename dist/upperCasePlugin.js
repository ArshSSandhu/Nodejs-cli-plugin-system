"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UppercasePlugin {
    transformText(text) {
        return text.toUpperCase();
    }
}
exports.default = UppercasePlugin;
