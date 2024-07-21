"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
//import requireModule from './node_modules/require-module'; // Install this package if not already
var PluginManager = /** @class */ (function () {
    function PluginManager(basePath) {
        this.pluginList = new Map();
        this.path = basePath;
    }
    PluginManager.prototype.registerPlugin = function (plugin) {
        if (!plugin.name || !plugin.packageName) {
            throw new Error('The plugin name and package are required');
        }
        if (this.pluginExists(plugin.name)) {
            throw new Error("Cannot add existing plugin ".concat(plugin.name));
        }
        try {
            // Try to load the plugin
            var packageContents = plugin.isRelative ? require(path.join(this.path, plugin.packageName)) : require(plugin.packageName);
            this.addPlugin(plugin, packageContents);
        }
        catch (error) {
            console.log("Cannot load plugin ".concat(plugin.name), error);
        }
    };
    PluginManager.prototype.pluginExists = function (name) {
        return this.pluginList.has(name);
    };
    PluginManager.prototype.addPlugin = function (plugin, instance) {
        this.pluginList.set(plugin.name, __assign(__assign({}, plugin), { instance: instance }));
    };
    PluginManager.prototype.listPluginList = function () {
        return Array.from(this.pluginList.values());
    };
    PluginManager.prototype.loadPlugin = function (name) {
        var plugin = this.pluginList.get(name);
        if (!plugin) {
            throw new Error("Cannot find plugin ".concat(name));
        }
        plugin.instance.default.prototype.options = plugin.options;
        return Object.create(plugin === null || plugin === void 0 ? void 0 : plugin.instance.default.prototype);
    };
    return PluginManager;
}());
exports.default = PluginManager;
