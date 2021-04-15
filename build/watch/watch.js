"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar = require("chokidar");
var config_1 = require("../config/config");
function SetWatchPaths(paths, cb) {
    chokidar
        .watch(paths)
        .removeAllListeners()
        .on('change', function (path) {
        if (config_1.Cfg.GetInstance().type === config_1.HandleFileTye.Vue) {
            if (/(vue)$/.test(path)) {
                cb(path, config_1.HandleFileTye.Vue);
            }
        }
        if (config_1.Cfg.GetInstance().type === config_1.HandleFileTye.Rn) {
            if (/(js)$/.test(path)) {
                cb(path, config_1.HandleFileTye.Rn);
            }
        }
    });
}
exports.SetWatchPaths = SetWatchPaths;
