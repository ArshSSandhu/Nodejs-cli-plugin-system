import PluginManager from './pluginManager'; 
import { TextPlugin } from './types'; 
import inquirer from 'inquirer'; 

export interface ITextSelectedChoice {
  text: string; 
  pluginName: string; 
}

class TextCLI {
  private pluginManager: PluginManager; 

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager; 

  }

  displayPrompt(): void {
    const pluginChoices: string[] = [];


    this.pluginManager.listPluginList().forEach((plugin) => {
      pluginChoices.push(plugin.name); 
    });

    type Question = any
    const questions: Question[] = [
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
  
    inquirer
      .prompt(questions)
      .then((answers) => {
       
        const { text, pluginName }: ITextSelectedChoice = answers as ITextSelectedChoice;
      
        const textPlugin = this.pluginManager.loadPlugin<TextPlugin>(pluginName); 
        console.log(`This is the transformed result for ${text}: ${textPlugin.transformText(text)}`);
      });

  }
}

export default TextCLI; 
