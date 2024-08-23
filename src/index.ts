
import * as fs from 'fs';
import * as path from 'path';
import PluginManager from './pluginManager';
import TextCLI from './textCLI';

const manager = new PluginManager(__dirname);

const pluginDirectory = path.join(__dirname, 'plugins');
fs.readdirSync(pluginDirectory).forEach(file => {
  if (file.endsWith('.js')) { 
    const pluginName = path.basename(file, '.js');
    manager.registerPlugin({
      name: `${pluginName}`,
      packageName: `./plugins/${pluginName}`,
      isRelative: true
    });
  }
});

const cli = new TextCLI(manager);
cli.displayPrompt();
