const { contextBridge, ipcRenderer } = require('electron')

// window.subModeUI { toggle: F, system: F }
contextBridge.exposeInMainWorld('subModeUI', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
