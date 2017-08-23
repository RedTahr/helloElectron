import { NFC } from "nfc-pcsc";

const nfc = new NFC();
// basic js example from nfc-pcsc
// gets Uncaught Error - A dynamic link library (DLL) initialization routine failed.
// thought this would solve it, but not yet... 
// https://electron.atom.io/docs/tutorial/using-native-node-modules/
//npm install --save-dev electron-rebuild
//# Every time you run "npm install", run this:
//./node_modules/.bin/electron-rebuild
//# On Windows if you have trouble, try:
//.\node_modules\.bin\electron-rebuild.cmd

nfc.on('reader', reader => {
    
        console.log(`${reader.reader.name}  device attached`);
    
        // needed for reading tags emulated with Android HCE
        // custom AID, change according to your Android for tag emulation
        // see https://developer.android.com/guide/topics/connectivity/nfc/hce.html
        reader.aid = 'F222222222';
    
        reader.on('card', card => {
    
            // card is object containing following data
            // [always] String type: TAG_ISO_14443_3 (standard nfc tags like Mifare) or TAG_ISO_14443_4 (Android HCE and others)
            // [always] String standard: same as type
            // [only TAG_ISO_14443_3] String uid: tag uid
            // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response
    
            console.log(`${reader.reader.name}  card detected`, card);
    
        });
    
        reader.on('card.off', card => {
            console.log(`${reader.reader.name}  card removed`, card);
        });
    
        reader.on('error', err => {
            console.log(`${reader.reader.name}  an error occurred`, err);
        });
    
        reader.on('end', () => {
            console.log(`${reader.reader.name}  device removed`);
        });
    
    });
    
    nfc.on('error', err => {
        console.log('an error occurred', err);
    });