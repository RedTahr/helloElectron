import {BrowserWindow} from "electron";

import { devMenuTemplate } from "./menu/dev_menu_template";

import * as path from "path";
import * as url from "url";

export default class Main {
  static mainWindow: Electron.BrowserWindow | null;
  static application: Electron.App;
  static BrowserWindow: Electron.BrowserWindow;
  static Menu: Electron.Menu;

  private static onWindowAllClosed(): void {
    if (process.platform !== "darwin") {
      Main.application.quit();
    }
  }

  private static onClose() {
    Main.mainWindow = null; // dereference the window object
  }

  private static setApplicationMenu(): void {
    var menus: any[] = [devMenuTemplate];
    Main.Menu.setApplicationMenu(Main.Menu.buildFromTemplate(menus));
  }

  private static onReady(): void {
    Main.setApplicationMenu();
    Main.mainWindow = new Main.BrowserWindow({width: 800, height: 600});
    Main.mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    }));
    Main.mainWindow.webContents.openDevTools();
    Main.mainWindow.on("closed", Main.onClose);
  }

  static main(app: Electron.App, browserWindow: Electron.BrowserWindow, menu: Electron.Menu): void {
    Main.Menu = menu;
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("ready", Main.onReady);
  }
}
