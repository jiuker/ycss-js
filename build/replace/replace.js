"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
var vue_1 = require("./vue");
var log_1 = require("../log/log");
function HandleChange(path, typ) {
    setTimeout(function () {
        if (typ === config_1.HandleFileTye.Rn) {
            log_1.Log("skip RN", path);
            return;
        }
        var replace;
        if (typ === config_1.HandleFileTye.Vue) {
            replace = new vue_1.VueReplace(path);
            log_1.Log("new vue instance");
        }
        log_1.Log("handle file is:", path);
        log_1.Log("fileBodyLength is:", "" + replace.GetFileBody().length);
        if (replace.GetFileBody() == '') {
            return;
        }
        var classCss = replace.FindClass();
        log_1.Log.apply(void 0, __spreadArrays(["classCss:"], classCss));
        var regexpCss = replace.GetRegexpCss(classCss);
        log_1.Log("regexpCss:", regexpCss);
        var zoomCss = replace.Zoom(regexpCss);
        log_1.Log("zoomCss:", zoomCss);
        var _a = replace.GetOldCss(), pos = _a[0], old = _a[1];
        log_1.Log("pos:", pos);
        log_1.Log("old:", old);
        var newPos = '';
        if (pos === "") {
            log_1.Log("没有插入位置！");
        }
        else {
            newPos = replace.Replace(old, "\r\n" + zoomCss + "\r\n", pos);
            log_1.Log("newPos:", newPos);
        }
        var same = IsTheSame(newPos, pos);
        if (!same) {
            replace.Save(newPos, pos);
        }
        else {
            log_1.Log("just the same!doNoting!");
        }
    }, 500);
}
exports.HandleChange = HandleChange;
var CompareStr = 'qwertyuiopasdfghjklzxcvbnm;1234567890-=+[]';
function IsTheSame(a, b) {
    var aMap = new Map();
    var bMap = new Map();
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var aByteStr = a_1[_i];
        var key = "" + aByteStr;
        var value = aMap.get(key);
        if (!value) {
            value = 0;
        }
        aMap.set(key, value + 1);
    }
    for (var _a = 0, b_1 = b; _a < b_1.length; _a++) {
        var bByteStr = b_1[_a];
        var key = "" + bByteStr;
        var value = bMap.get(key);
        if (!value) {
            value = 0;
        }
        bMap.set(key, value + 1);
    }
    for (var _b = 0, CompareStr_1 = CompareStr; _b < CompareStr_1.length; _b++) {
        var cByteStr = CompareStr_1[_b];
        if (!!aMap.get(cByteStr) && !!bMap.get(cByteStr) && aMap.get(cByteStr) !== bMap.get(cByteStr)) {
            return false;
        }
    }
    return true;
}
