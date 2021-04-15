"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
function Log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (config_1.Cfg.GetInstance().debug) {
        console.log.apply(console, args);
    }
}
exports.Log = Log;
