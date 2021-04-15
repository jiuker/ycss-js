"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var watch_1 = require("./watch/watch");
var regexp_1 = require("./config/regexp");
var replace_1 = require("./replace/replace");
config_1.SetConfigPath('./res/config/config.json');
config_1.SetConfigInitAndWatch(function () {
    watch_1.SetWatchPaths(config_1.Cfg.GetInstance().watchDir, function (path, typ) {
        replace_1.HandleChange(path, typ);
    });
    regexp_1.SetCommonRegexp(config_1.Cfg.GetInstance().common);
    regexp_1.SetSingleRegexp(config_1.Cfg.GetInstance().single);
});
// 让程序停住
setInterval(function () {
}, 10000000);
