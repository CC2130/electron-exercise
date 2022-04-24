const { app, BrowserWindow, Notification } = require('electron')
const path = require('path')

let progressInterval

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  const INCREMENT = 0.02
  const INTERVAL_DELAY = 100 // ms

  let c = 0
  progressInterval = setInterval(() => {
    // 设置 c 为进度值
    win.setProgressBar(c)

    // 如果进度值超过 1，则重置为 0
    if (c < 0) {
      progressDone()
      clearInterval(progressInterval)
    }else if (c < 2) {
      c += INCREMENT
    } else {
      c = -0.05
    }
  }, INTERVAL_DELAY)
}

function progressDone() {
  new Notification({ title: 'Progress Done', body: 'Progress bar has been reset' }).show()
}

app.whenReady().then(createWindow)

// before the app is terminated, clear both timers
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

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
