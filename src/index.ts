
import TextCLI from '../textCLI';
import PluginManager from '../pluginManager';

const manager = new PluginManager(__dirname);

// Register additional plugins
manager.registerPlugin({
  name: 'colors-plugin',
  packageName: './colorsPlugin',
  isRelative: true,
});

manager.registerPlugin({
  name: 'passwordify-plugin',
  packageName: './passwordifyPlugin',
  isRelative: true,
  options: {
    symbol: '*'
  }
});

const cli = new TextCLI(manager);
cli.displayPrompt();
