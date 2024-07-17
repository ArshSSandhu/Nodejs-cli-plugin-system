"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
class TextCLI {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        // Register the default behavior plugin
        this.pluginManager.registerPlugin({
            name: 'echo-plugin',
            packageName: './echoPlugin',
            isRelative: true,
        });
    }
    displayPrompt() {
        const pluginChoices = [];
        this.pluginManager.listPluginList().forEach((plugin) => {
            pluginChoices.push(plugin.name);
        });
        // Define the questions with explicit types
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
        inquirer_1.default.prompt(questions).then((answer) => {
            // Execute the plugin
            const textPlugin = this.pluginManager.loadPlugin(answer.pluginName);
            console.log(`This is the transformed result for ${answer.text}: ${textPlugin.transformText(answer.text)}`);
        });
    }
}
exports.default = TextCLI;
