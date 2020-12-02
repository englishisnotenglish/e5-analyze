const { app, BrowserWindow } = require('electron')
const Controller = require('../backend/factory/Controller.ts')

const controller = new Controller()
controller.main()

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(
    'http://localhost:3000'
    // : `file://${path.join(__dirname, "../build/index.html")}`
    );

  // win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
