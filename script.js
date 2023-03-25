document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.querySelector(".chat-input");
  const chatMessages = document.querySelector(".chat-messages");
  const chatForm = document.getElementById("chat-form");

  // Handle sending message
  chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage(chatInput.value);
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

  // Update getChatbotResponse to call the API
  async function getChatbotResponse(message) {
    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error fetching ChatGPT response:', error);
      return 'An error occurred. Please try again.';
    }
  }
});
