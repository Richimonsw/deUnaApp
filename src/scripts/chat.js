document.addEventListener("DOMContentLoaded", function () {
    const sendBtn = document.getElementById("send-btn");
    const messageInput = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            const newMessage = document.createElement("div");
            newMessage.classList.add("message", "sent");
            newMessage.textContent = messageText;
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            messageInput.value = "";
        }
    }
});
