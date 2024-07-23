
import TextCLI from './textCLI';
import PluginManager from './pluginManager';

const manager = new PluginManager(__dirname);

const cli = new TextCLI(manager);
cli.displayPrompt();
