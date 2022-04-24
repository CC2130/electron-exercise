const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  console.log("load index.html")
}

const fileName = 'recent-used.md'
fs.writeFile(fileName, 'recent', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

app.whenReady().then(createWindow)

ipcMain.on('addRecentDocument', (event, fileName) => {
  console.log("add " + fileName + " to recent files")
  // 只有当此路径有文件时才会显示在最近打开的文件中
  app.addRecentDocument(path.join(__dirname, fileName))
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  app.clearRecentDocuments()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
