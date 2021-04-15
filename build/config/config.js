"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var chokidar = require("chokidar");
var configFilePath = "";
var configCallBack;
function SetConfigPath(path) {
    configFilePath = path;
}
exports.SetConfigPath = SetConfigPath;
function SetConfigInitAndWatch(cb) {
    configCallBack = cb;
    configCallBack();
}
exports.SetConfigInitAndWatch = SetConfigInitAndWatch;
var HandleFileTye;
(function (HandleFileTye) {
    HandleFileTye["Vue"] = "vue";
    HandleFileTye["Rn"] = "rn";
})(HandleFileTye = exports.HandleFileTye || (exports.HandleFileTye = {}));
var Cfg = /** @class */ (function () {
    function Cfg() {
    }
    Cfg.GetInstance = function () {
        var _this = this;
        if (!Cfg._instance) {
            var fileBody = fs.readFileSync(configFilePath, "utf8").toString();
            this._instance = JSON.parse(fileBody);
            var watcher = chokidar.watch(configFilePath);
            watcher.on("change", function (path) {
                var fileBody = fs.readFileSync(path, "utf8");
                try {
                    _this._instance = JSON.parse(fileBody);
                }
                catch (error) {
                    console.log("配置文件获取异常", error);
                }
                if (_this._instance.type !== HandleFileTye.Rn &&
                    _this._instance.type !== HandleFileTye.Vue) {
                    console.warn("the type should be one of [vue,rn],but set ${this._instance.type},now will set vue");
                    _this._instance.type = HandleFileTye.Vue;
                }
                configCallBack();
            });
        }
        return this._instance;
    };
    return Cfg;
}());
exports.Cfg = Cfg;
