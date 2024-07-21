declare module '../textCLI' {
    export class TextCLI {
      constructor(pluginManager: PluginManager);
      displayPrompt(): void;
    }
  }
  