"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var config_1 = require("../config/config");
var regexp_1 = require("../config/regexp");
var log_1 = require("../log/log");
var VueReplace = /** @class */ (function () {
    function VueReplace(path) {
        this.path = path;
        this.body = fs.readFileSync(this.path, 'utf8').toString();
    }
    VueReplace.prototype.GetFileBody = function () {
        return this.body;
    };
    VueReplace.prototype.Replace = function (old, newcss, pos) {
        return pos.replace(old, newcss);
    };
    VueReplace.prototype.GetOldCss = function () {
        var result = [];
        var oldCssReg = config_1.Cfg.GetInstance().oldCssReg;
        var oldCssMatch = this.body.match(new RegExp(oldCssReg));
        if (!!oldCssMatch) {
            result.push(oldCssMatch[0]);
            result.push(oldCssMatch[1]);
        }
        if (result.length == 0) {
            result = ['', ''];
        }
        return result;
    };
    VueReplace.prototype.Zoom = function (css) {
        var needZoomUnit = config_1.Cfg.GetInstance().needZoomUnit;
        css = css.replace(new RegExp('([0-9|\.]{1,10}[ |	]{0,3}(' + needZoomUnit + '){1,5})', 'g'), function (data) {
            return parseFloat(data.replace(new RegExp(needZoomUnit), '')) * config_1.Cfg.GetInstance().zoom + config_1.Cfg.GetInstance().outUnit;
        });
        return css;
    };
    VueReplace.prototype.GetRegexpCss = function (css) {
        var resultArr = [];
        for (var _i = 0, css_1 = css; _i < css_1.length; _i++) {
            var _css = css_1[_i];
            var _loop_1 = function (cindex) {
                var classMatch = _css.match(regexp_1.CommonRegexp[cindex].key);
                if (!!classMatch) {
                    regexp_1.CommonRegexp[cindex].value.forEach(function (item) {
                        var itemTemp = item;
                        for (var classMatchIndex = 1; classMatchIndex < classMatch.length && itemTemp.indexOf('$') != -1; classMatchIndex++) {
                            itemTemp = itemTemp.replace(new RegExp("\\$" + classMatchIndex, 'g'), classMatch[classMatchIndex]);
                        }
                        // itemTemp is singal class name
                        for (var sindex = 0; sindex < regexp_1.SingleRegexp.length; sindex++) {
                            var singalMatch = itemTemp.match(regexp_1.SingleRegexp[sindex].key);
                            if (!!singalMatch) {
                                var singalValue = regexp_1.SingleRegexp[sindex].value;
                                for (var singalMatchIndex = 0; singalMatchIndex < singalMatch.length && singalValue.indexOf('$') != -1; singalMatchIndex++) {
                                    singalValue = singalValue.replace(new RegExp("\\$" + singalMatchIndex, 'g'), singalMatch[singalMatchIndex]);
                                }
                                resultArr.push("." + itemTemp + "{" + singalValue + "}");
                            }
                        }
                    });
                    return "break";
                }
            };
            for (var cindex = 0; cindex < regexp_1.CommonRegexp.length; cindex++) {
                var state_1 = _loop_1(cindex);
                if (state_1 === "break")
                    break;
            }
        }
        return resultArr.join('\r\n');
    };
    VueReplace.prototype.FindClass = function () {
        var allSet = new Set();
        var allCss = [];
        var resultCss = [];
        for (var _i = 0, _a = config_1.Cfg.GetInstance().reg; _i < _a.length; _i++) {
            var _reg = _a[_i];
            allCss = allCss.concat(this.GetFileBody().match(new RegExp(_reg, 'g')).filter(function (item) {
                return item !== '';
            }).map(function (item) {
                item = item.replace(/class=/, '');
                item = item.replace(/"|'/g, '');
                return item;
            }));
        }
        allCss.join(' ').split(/ |  /g).filter(function (item) {
            return item !== '';
        }).forEach(function (item) {
            allSet.add(item);
        });
        allSet.forEach(function (item) {
            resultCss.push(item);
        });
        return resultCss;
    };
    VueReplace.prototype.Save = function (newPos, old) {
        var willSave = this.GetFileBody().replace(old, newPos);
        try {
            fs.writeFileSync(this.path, willSave, { mode: 511 });
            log_1.Log("save success!");
        }
        catch (error) {
            log_1.Log("save error", error);
        }
    };
    return VueReplace;
}());
exports.VueReplace = VueReplace;
