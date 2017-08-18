"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var nativescript_nfc_1 = require("nativescript-nfc");
console.log("renderer fired.");
var nfc = new nativescript_nfc_1.Nfc();
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('platform-info').innerHTML = os.platform();
});
nfc.available().then(function (avail) {
    console.log(avail ? "Yes" : "No");
});
nfc.setOnTagDiscoveredListener(function (data) {
    console.log("Discovered a tag with ID " + data.id);
}).then(function () {
    console.log("OnTagDiscovered listener added");
});
nfc.setOnTagDiscoveredListener(null).then(function () {
    console.log("OnTagDiscovered listener removed");
});
nfc.setOnNdefDiscoveredListener(function (data) {
    if (data.message) {
        for (var m in data.message) {
            var record = data.message[m];
            console.log("Ndef discovered! Message record: " + record.payloadAsString);
        }
    }
}).then(function () {
    console.log("OnNdefDiscovered listener added");
});
nfc.setOnNdefDiscoveredListener(null).then(function () {
    console.log("OnNdefDiscovered listener removed");
});
//# sourceMappingURL=renderer.js.map