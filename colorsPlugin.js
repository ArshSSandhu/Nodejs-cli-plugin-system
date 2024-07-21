"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const colors_1 = __importDefault(require("colors"));
class ColorsPlugin extends types_1.TextPlugin {
    transformText(text) {
        return colors_1.default.rainbow(text);
    }
}
exports.default = ColorsPlugin;
