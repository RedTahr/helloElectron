console.log('main!')

const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

app.on('ready', _ => {
  console.log('ready!')
  let mainWindow = new BrowserWindow({
    height:400,
    width:400
  })

  mainWindow.loadURL(`file://${__dirname}/countdown.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', _ => {
    console.log('closed!')
    mainWindow = null // so the garbage collector knows it can collect this
  })
})
