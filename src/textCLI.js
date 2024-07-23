"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer"); 

var TextCLI = /** @class */ (function () {
    function TextCLI(pluginManager) {
        this.pluginManager = pluginManager; 
        
        this.pluginManager.registerPlugin({
            name: 'echo-plugin', 
            packageName: './echoPlugin',
            isRelative: true 
        });

    }
   
    TextCLI.prototype.displayPrompt = function () {
        var _this = this;
        var pluginChoices = [];
   
        this.pluginManager.listPluginList().forEach(function (plugin) {
            pluginChoices.push(plugin.name);
        });
        var questions = [
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
            .then(function (answers) {
           
            var _a = answers, text = _a.text, pluginName = _a.pluginName;
        
            var textPlugin = _this.pluginManager.loadPlugin(pluginName); 
            console.log("This is the transformed result for ".concat(text, ": ").concat(textPlugin.transformText(text))); 
        });
    };
    return TextCLI;
}());
exports.default = TextCLI;
