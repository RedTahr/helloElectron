"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });
var nfc_pcsc_1 = require("nfc-pcsc");
var nfc = new nfc_pcsc_1.NFC();
nfc.on('reader', function (reader) {
    console.log(reader.reader.name + "  device attached");
    reader.aid = 'F222222222';
    reader.on('card', function (card) {
        console.log(reader.reader.name + "  card detected", card);
    });
    reader.on('card.off', function (card) {
        console.log(reader.reader.name + "  card removed", card);
    });
    reader.on('error', function (err) {
        console.log(reader.reader.name + "  an error occurred", err);
    });
    reader.on('end', function () {
        console.log(reader.reader.name + "  device removed");
    });
});
nfc.on('error', function (err) {
    console.log('an error occurred', err);
});
//# sourceMappingURL=nfclogic.js.map