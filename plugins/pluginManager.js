"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
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
            const packageContents = plugin.isRelative ? require(path.join(this.path, plugin.packageName)) : require(plugin.packageName);
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
