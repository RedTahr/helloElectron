"use strict";

var nfc_pcsc_1 = require("nfc-pcsc");
var logger = require("js-logger");
var ndef = require('@taptrack/ndef');

logger.useDefaults();
var nfc = new nfc_pcsc_1.NFC(logger);

nfc.on('reader', function (reader) {
    console.log(reader.reader.name + "  device attached");
    reader.aid = 'F222222222';
    reader.on('card', function (card) {
        console.log(reader.reader.name + "  card detected", card);
        document.getElementById('card-uid').innerHTML = card.uid;
        for (var index = 0; index < card.atr.length; index++) {
            var element = card.atr[index];
            console.log("atr: " + element);
        }
        
        var ndefMessage = ndef.Message.fromBytes(card.atr);
        // array of all the records
        var records = ndefMessage.getRecords();        
        for(var i = 0; i < records.length; i++) {
            var record = records[i];
            console.log("Chunked: "+(record.isChunked?"Yes":"No"));
            console.log("TNF: "+record.getTnf().toString());
            console.log("Type: "+record.getTnf().toString());
            console.log("ID: "+record.getId().toString());
            console.log("Payload: "+record.getTnf().toString());
        }

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