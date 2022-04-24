const NOTIFICATION_TITLE = "Title"
const NOTIFICATION_BODY = "来自 renderer 进程的通知，请点击！"
const CLICK_MESSAGE = "Notification clicked!"

document.getElementById("btn").addEventListener('click', async () => {
  new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
    .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE
})
