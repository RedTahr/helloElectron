"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dev_menu_template_1 = require("./menu/dev_menu_template");
var path = require("path");
var url = require("url");
var Main = (function () {
    function Main() {
    }
    Main.onWindowAllClosed = function () {
        if (process.platform !== "darwin") {
            Main.application.quit();
        }
    };
    Main.onClose = function () {
        Main.mainWindow = null;
    };
    Main.setApplicationMenu = function () {
        var menus = [dev_menu_template_1.devMenuTemplate];
        Main.Menu.setApplicationMenu(Main.Menu.buildFromTemplate(menus));
    };
    Main.onReady = function () {
        Main.setApplicationMenu();
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 });
        Main.mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        }));
        Main.mainWindow.webContents.openDevTools();
        Main.mainWindow.on("closed", Main.onClose);
    };
    Main.main = function (app, browserWindow, menu) {
        Main.Menu = menu;
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on("window-all-closed", Main.onWindowAllClosed);
        Main.application.on("ready", Main.onReady);
    };
    return Main;
}());
exports.default = Main;
//# sourceMappingURL=Main.js.map