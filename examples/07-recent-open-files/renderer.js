document.getElementById('btn').addEventListener('click', async () => {
  const data = document.getElementById('input').value
  document.getElementById('info').innerText = data
  await window.recentFile.addRecentDocument(data)
})
