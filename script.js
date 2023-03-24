document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.querySelector(".chat-input");
    const chatSendBtn = document.querySelector(".chat-send-btn");
    const chatMessages = document.querySelector(".chat-messages");

    // Handle sending message
    chatSendBtn.addEventListener("click", function () {
        sendMessage(chatInput.value);
    });

    chatInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage(chatInput.value);
        }
    });

    function sendMessage(message) {
        if (!message.trim()) {
            return;
        }

        // Display user message
        const userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user-message");
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);
        chatInput.value = "";

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Send message to chatbot and display its response
        getChatbotResponse(message).then((response) => {
            const botMessage = document.createElement("div");
            botMessage.classList.add("chat-message", "bot-message");
            botMessage.textContent = response;
            chatMessages.appendChild(botMessage);

            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }

    // Mock chatbot response
    function getChatbotResponse(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("You said: " + message);
            }, 1000);
        });
    }
});
