import PluginManager from './pluginManager'; // Importing PluginManager class from '@text-plugins/plugin-manager' module
import { TextPlugin } from './types'; // Importing TextPlugin interface from '@text-plugins/types' module
import inquirer from 'inquirer'; // Importing inquirer library for interactive prompts

// Interface definition for the user's selected choice in prompts
export interface ITextSelectedChoice {
  text: string; // Holds the text input from the user
  pluginName: string; // Holds the name of the plugin selected by the user
}

// Class definition for the CLI application
class TextCLI {
  private pluginManager: PluginManager; // Declaring a private property pluginManager of type PluginManager

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager; // Assigning the passed PluginManager instance to this.pluginManager

    // Registering a default behavior plugin named 'echo-plugin'
    this.pluginManager.registerPlugin({
      name: 'echo-plugin', // Plugin name
      packageName: './echoPlugin', // Package location (relative path)
      isRelative: true // Indicates that the path is relative to the current file
    });
  }

  // Method to display prompts and handle user input
  displayPrompt(): void {
    const pluginChoices: string[] = [];

    // Iterating over the list of registered plugins and extracting their names
    this.pluginManager.listPluginList().forEach((plugin) => {
      pluginChoices.push(plugin.name); // Adding each plugin's name to pluginChoices array
    });

    type Question = any
    const questions: Question[] = [
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
  
    inquirer
      .prompt(questions)
      .then((answers) => {
        // Destructure the answer object to match ITextSelectedChoice
        const { text, pluginName }: ITextSelectedChoice = answers as ITextSelectedChoice;
        // Execute the selected plugin
        const textPlugin = this.pluginManager.loadPlugin<TextPlugin>(pluginName); // Loading the selected plugin
        console.log(`This is the transformed result for ${text}: ${textPlugin.transformText(text)}`); // Logging the transformed result
      });

  }
}

export default TextCLI; // Exporting the TextCLI class as default
