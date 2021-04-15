"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RnCss = /** @class */ (function () {
    function RnCss() {
    }
    RnCss.prototype.Set = function (uint) {
        this.data.push(uint);
    };
    RnCss.prototype.GetAllData = function () {
        return this.data;
    };
    return RnCss;
}());
var RnCssUint = /** @class */ (function () {
    function RnCssUint(reg, val) {
        this.reg = reg;
        this.val = val;
    }
    RnCssUint.prototype.Reg = function () {
        return this.reg;
    };
    RnCssUint.prototype.Val = function () {
        return this.val;
    };
    return RnCssUint;
}());
function NewVueCss() {
    return new RnCss();
}
exports.NewVueCss = NewVueCss;
function NewVueCssUint(reg, cssVal) {
    cssVal = cssVal.trim();
    return new RnCssUint(reg, cssVal);
}
exports.NewVueCssUint = NewVueCssUint;
