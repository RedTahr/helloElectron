import * as os from "os"; // native node.js module
import { Nfc, NfcTagData, NfcNdefData } from "nativescript-nfc"; // https://www.npmjs.com/package/nativescript-nfc - https://github.com/EddyVerbruggen/nativescript-nfc/tree/master/src

console.log("renderer fired.");

let nfc = new Nfc();

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('platform-info').innerHTML = os.platform();
});

nfc.available().then((avail) => {
  console.log(avail ? "Yes" : "No");
});

nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
  console.log("Discovered a tag with ID " + data.id);
}).then(() => {
  console.log("OnTagDiscovered listener added");
});

nfc.setOnTagDiscoveredListener(null).then(() => {
  console.log("OnTagDiscovered listener removed");
});

nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
  // data.message is an array of records, so: 
  if (data.message) {
    for (let m in data.message) {
      let record = data.message[m];
      console.log("Ndef discovered! Message record: " + record.payloadAsString);
    }
  }
}).then(() => {
  console.log("OnNdefDiscovered listener added");
});

nfc.setOnNdefDiscoveredListener(null).then(() => {
  console.log("OnNdefDiscovered listener removed");
});

//nfc.writeTag({
//  uriRecords: [
//    {
//      id: [100],
//      uri: "https://www.progress.com"
//    }
//  ]
//}).then(() => {
//  console.log("Wrote Uri record 'https://www.progress.com");
//}, (err) => {
//  alert(err);
//});

//nfc.eraseTag().then(() => {
//  console.log("Tag erased");
//});
