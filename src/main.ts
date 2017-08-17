import {BrowserWindow} from "electron"

const path = require("path")
const url = require("url")

export default class Main {
  static mainWindow: Electron.BrowserWindow | null;
  static application: Electron.App;
  static BrowserWindow;

  private static onWindowAllClosed(){
    if (process.platform !== "darwin") {
      Main.application.quit();
    }
  }

  private static onClose() {
    Main.mainWindow = null; // Dereference the window object
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600});
    Main.mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    }));
    Main.mainWindow.webContents.openDevTools();
    Main.mainWindow.on("closed", Main.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // pass in electron stuff to make things more testable, i.e. less dependencies

    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("ready", Main.onReady);
  }
}
