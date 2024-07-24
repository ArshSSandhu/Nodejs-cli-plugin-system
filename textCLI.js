"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer")); 

class TextCLI {
    constructor(pluginManager) {
        this.pluginManager = pluginManager; 
      
    this.pluginManager.registerPlugin({
        name: 'echo-plugin', // Plugin name
        packageName: './echoPlugin', // Package location (relative path)
        isRelative: true // Indicates that the path is relative to the current file
                                        });

    // Register new Uppercase Plugin
    this.pluginManager.registerPlugin({
        name: 'uppercase-plugin',
        packageName: './src/upperCasePlugin',
        isRelative: true,
                                        });

    // Register new LowerCase Plugin
    this.pluginManager.registerPlugin({
        name: 'lowercase-plugin',
        packageName: './src/lowerCasePlugin',
        isRelative: true,
      });

                                    }
    displayPrompt() {
        const pluginChoices = [];
      
        this.pluginManager.listPluginList().forEach((plugin) => {
            pluginChoices.push(plugin.name); 
        });
        const questions = [
            {
                type: 'input',
                name: 'text',
                message: 'What text do you want to transform?', 
            },
            {
                type: 'list',
                name: 'pluginName',
                message: 'What plugin do you want to execute?',
                choices: pluginChoices, 
            },
        ];
        inquirer_1.default
            .prompt(questions)
            .then((answers) => {
         
            const { text, pluginName } = answers;
            
            const textPlugin = this.pluginManager.loadPlugin(pluginName); 
            console.log(`This is the transformed result for ${text}: ${textPlugin.transformText(text)}`); 
        });
    }
}
exports.default = TextCLI; 
