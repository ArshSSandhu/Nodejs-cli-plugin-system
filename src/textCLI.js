"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer"); // Importing inquirer library for interactive prompts
// Class definition for the CLI application
var TextCLI = /** @class */ (function () {
    function TextCLI(pluginManager) {
        this.pluginManager = pluginManager; // Assigning the passed PluginManager instance to this.pluginManager
        // Registering a default behavior plugin named 'echo-plugin'
        this.pluginManager.registerPlugin({
            name: 'echo-plugin', // Plugin name
            packageName: './echoPlugin', // Package location (relative path)
            isRelative: true // Indicates that the path is relative to the current file
        });

 // Register new Uppercase Plugin
// this.pluginManager.registerPlugin({
   // name: 'uppercase-plugin',
   // packageName: './upperCasePlugin',
  //  isRelative: true,
//  });

    }
    // Method to display prompts and handle user input
    TextCLI.prototype.displayPrompt = function () {
        var _this = this;
        var pluginChoices = [];
        // Iterating over the list of registered plugins and extracting their names
        this.pluginManager.listPluginList().forEach(function (plugin) {
            pluginChoices.push(plugin.name); // Adding each plugin's name to pluginChoices array
        });
        var questions = [
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
            .then(function (answers) {
            // Destructure the answer object to match ITextSelectedChoice
            var _a = answers, text = _a.text, pluginName = _a.pluginName;
            // Execute the selected plugin
            var textPlugin = _this.pluginManager.loadPlugin(pluginName); // Loading the selected plugin
            console.log("This is the transformed result for ".concat(text, ": ").concat(textPlugin.transformText(text))); // Logging the transformed result
        });
    };
    return TextCLI;
}());
exports.default = TextCLI; // Exporting the TextCLI class as default
