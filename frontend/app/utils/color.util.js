"use strict";
var ColorUtil = (function () {
    function ColorUtil() {
    }
    ColorUtil.getColorClass = function (str) {
        var magicNumber = 0;
        for (var i = 0; i < str.length; i++) {
            magicNumber += str.charCodeAt(i);
        }
        var index = magicNumber % this.colorClasses.length;
        return this.colorClasses[index];
    };
    ColorUtil.colorClasses = ["_fuchsia", "_red", "_orange", "_lime-green", "_blue", "_raspberry", "_violet", "_plum", "_indigo", "_blue_blue", "_green"];
    return ColorUtil;
}());
exports.ColorUtil = ColorUtil;
//# sourceMappingURL=color.util.js.map