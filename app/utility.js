"use strict";
exports.__esModule = true;
function getInputValue(elementID) {
    var inputElement = document.getElementById(elementID);
    return inputElement.value;
}
exports.getValue = getInputValue;
function logger(message) {
    console.log(message);
}
exports.logger = logger;
//# sourceMappingURL=utility.js.map