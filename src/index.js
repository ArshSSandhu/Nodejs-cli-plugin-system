"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textCLI_1 = require("./textCLI");
var pluginManager_1 = require("./pluginManager");
var manager = new pluginManager_1.default(__dirname);
// Register additional plugins
//manager.registerPlugin({
 //   name: 'colors-plugin',
 //   packageName: './colorsPlugin',
 //   isRelative: true,
//});
//manager.registerPlugin({
  //  name: 'passwordify-plugin',
  //  packageName: './passwordifyPlugin',
  //  isRelative: true,
 //   options: {
  //      symbol: '*'
  //  }
//});
var cli = new textCLI_1.default(manager);
cli.displayPrompt();
