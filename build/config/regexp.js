"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var fs_1 = require("fs");
exports.CommonRegexp = [];
exports.SingleRegexp = [];
function SetCommonRegexp(paths) {
    exports.CommonRegexp = [];
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var path = paths_1[_i];
        try {
            var $ = cheerio.load(fs_1.readFileSync(path, 'utf8'));
            $("css").each(function (index, element) {
                try {
                    var value = element.children[0].data.trim().split(/\r\n/g).filter(function (item) {
                        return item !== '';
                    });
                    exports.CommonRegexp.push({
                        key: new RegExp(element.attribs['key'].trim()),
                        value: value,
                    });
                }
                catch (error) {
                    console.log('common正则初始化失败', error);
                }
            });
        }
        catch (error) {
            console.log('获取common文件失败', error);
        }
    }
}
exports.SetCommonRegexp = SetCommonRegexp;
function SetSingleRegexp(paths) {
    exports.SingleRegexp = [];
    for (var _i = 0, paths_2 = paths; _i < paths_2.length; _i++) {
        var path = paths_2[_i];
        try {
            var $ = cheerio.load(fs_1.readFileSync(path, 'utf8'));
            $("css").each(function (index, element) {
                try {
                    var value = element.children[0].data.trim();
                    exports.SingleRegexp.push({
                        key: new RegExp(element.attribs['key'].trim()),
                        value: value,
                    });
                }
                catch (error) {
                    console.log('singal正则初始化失败', error);
                }
            });
        }
        catch (error) {
            console.log('获取singal文件失败', error);
        }
    }
}
exports.SetSingleRegexp = SetSingleRegexp;
