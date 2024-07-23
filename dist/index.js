"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const textCLI_1 = __importDefault(require("./textCLI"));
const pluginManager_1 = __importDefault(require("./pluginManager"));
const manager = new pluginManager_1.default(__dirname);
// Register additional plugins
//manager.registerPlugin({
//  name: 'colors-plugin',
//packageName: './colorsPlugin',
//isRelative: true,
//});
//manager.registerPlugin({
//name: 'passwordify-plugin',
//packageName: './passwordifyPlugin',
//isRelative: true,
//options: {
//symbol: '*'
//}
//});
const cli = new textCLI_1.default(manager);
cli.displayPrompt();
