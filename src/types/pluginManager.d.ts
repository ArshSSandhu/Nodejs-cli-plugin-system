declare module '../pluginManager' {
    export default class PluginManager {
      registerPlugin(plugin: any): void;
      listPluginList(): { name: string }[];
      loadPlugin<T>(name: string): T;
    }
  }
  