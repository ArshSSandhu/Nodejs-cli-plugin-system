"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
//import requireModule from './node_modules/require-module'; // Install this package if not already
class PluginManager {
    constructor(basePath) {
        this.pluginList = new Map();
        this.path = basePath;
    }
    registerPlugin(plugin) {
        if (!plugin.name || !plugin.packageName) {
            throw new Error('The plugin name and package are required');
        }
        if (this.pluginExists(plugin.name)) {
            throw new Error(`Cannot add existing plugin ${plugin.name}`);
        }
        try {
            // Try to load the plugin
            const packageContents = plugin.isRelative ? require(path_1.default.join(this.path, plugin.packageName)) : require(plugin.packageName);
            this.addPlugin(plugin, packageContents);
        }
        catch (error) {
            console.log(`Cannot load plugin ${plugin.name}`, error);
        }
    }
    pluginExists(name) {
        return this.pluginList.has(name);
    }
    addPlugin(plugin, instance) {
        this.pluginList.set(plugin.name, Object.assign(Object.assign({}, plugin), { instance }));
    }
    listPluginList() {
        return Array.from(this.pluginList.values());
    }
    loadPlugin(name) {
        const plugin = this.pluginList.get(name);
        if (!plugin) {
            throw new Error(`Cannot find plugin ${name}`);
        }
        plugin.instance.default.prototype.options = plugin.options;
        return Object.create(plugin === null || plugin === void 0 ? void 0 : plugin.instance.default.prototype);
    }
}
exports.default = PluginManager;
