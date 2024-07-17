import path from 'path';
import { IPlugin } from './types';
import requireModule from 'require-module'; // Install this package if not already

class PluginManager {
  private pluginList: Map<string, IPlugin>;
  private path: string;

  constructor(basePath: string) {
    this.pluginList = new Map<string, IPlugin>();
    this.path = basePath;
  }

  registerPlugin(plugin: IPlugin): void {
    if (!plugin.name || !plugin.packageName) {
      throw new Error('The plugin name and package are required');
    }

    if (this.pluginExists(plugin.name)) {
      throw new Error(`Cannot add existing plugin ${plugin.name}`);
    }

    try {
      // Try to load the plugin
      const packageContents = plugin.isRelative ? requireModule(path.join(this.path, plugin.packageName)) : requireModule(plugin.packageName);
      this.addPlugin(plugin, packageContents);
    } catch (error) {
      console.log(`Cannot load plugin ${plugin.name}`, error);
    }
  }

  private pluginExists(name: string): boolean {
    return this.pluginList.has(name);
  }

  private addPlugin(plugin: IPlugin, instance: any): void {
    this.pluginList.set(plugin.name, { ...plugin, instance });
  }

  listPluginList(): IPlugin[] {
    return Array.from(this.pluginList.values());
  }

  loadPlugin<T>(name: string): T {
    const plugin = this.pluginList.get(name);
    if (!plugin) {
      throw new Error(`Cannot find plugin ${name}`);
    }
    plugin.instance.default.prototype.options = plugin.options;
    return Object.create(plugin?.instance.default.prototype) as T;
  }
}

export default PluginManager;
