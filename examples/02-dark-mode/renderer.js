document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.subModeUI.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : "Light"
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.subModeUI.system()
  document.getElementById('theme-source').innerHTML = 'System'
})
