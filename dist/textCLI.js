"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer")); // Importing inquirer library for interactive prompts
// Class definition for the CLI application
class TextCLI {
    constructor(pluginManager) {
        this.pluginManager = pluginManager; // Assigning the passed PluginManager instance to this.pluginManager
        // Registering a default behavior plugin named 'echo-plugin'
        //  this.pluginManager.registerPlugin({
        //   name: 'echo-plugin', // Plugin name
        //  packageName: './echoPlugin', // Package location (relative path)
        //   isRelative: true // Indicates that the path is relative to the current file
        //  });
        // Register new Uppercase Plugin
        this.pluginManager.registerPlugin({
            name: 'uppercase-plugin',
            packageName: './upperCasePlugin',
            isRelative: true,
        });
        // Register other plugins
        this.pluginManager.registerPlugin({
            name: 'colors-plugin',
            packageName: './colorsPlugin',
            isRelative: true,
        });
        this.pluginManager.registerPlugin({
            name: 'passwordify-plin',
            packageName: './passwordifyPlugin',
            isRelative: true,
            options: {
                symbol: '*'
            }
        });
    }
    // Method to display prompts and handle user input
    displayPrompt() {
        const pluginChoices = [];
        // Iterating over the list of registered plugins and extracting their names
        this.pluginManager.listPluginList().forEach((plugin) => {
            pluginChoices.push(plugin.name); // Adding each plugin's name to pluginChoices array
        });
        const questions = [
            {
                type: 'input',
                name: 'text',
                message: 'What text do you want to transform?', // Prompt message for text input
            },
            {
                type: 'list',
                name: 'pluginName',
                message: 'What plugin do you want to execute?', // Prompt message for plugin selection
                choices: pluginChoices, // Available plugin choices obtained earlier
            },
        ];
        inquirer_1.default
            .prompt(questions)
            .then((answers) => {
            // Destructure the answer object to match ITextSelectedChoice
            const { text, pluginName } = answers;
            // Execute the selected plugin
            const textPlugin = this.pluginManager.loadPlugin(pluginName); // Loading the selected plugin
            console.log(`This is the transformed result for ${text}: ${textPlugin.transformText(text)}`); // Logging the transformed result
        });
    }
}
exports.default = TextCLI; // Exporting the TextCLI class as default
