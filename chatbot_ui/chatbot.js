// Toggle chatbox visibility
document.getElementById("chat-icon").addEventListener("click", () => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.display = chatContainer.style.display === "none" ? "flex" : "none";
});

// Send user input to Flask API and get the response
document.getElementById("send-btn").addEventListener("click", async () => {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;  // Do nothing if the input is empty

    // Display user message
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="message user">${userInput}</div>`;

    // Clear input field
    document.getElementById("user-input").value = '';

    // Display typing animation while waiting for the response
    const typingAnimation = `<div class="message bot"><span class="typing-animation"></span></div>`;
    chatBox.innerHTML += typingAnimation;

    // Scroll to the bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send message to backend (Flask)
    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: userInput,
            context: chatBox.innerHTML // Send previous conversation history
        })
    });

    const data = await response.json();
    const botReply = data.response;

    // Remove the typing animation and display the bot's reply
    chatBox.innerHTML = chatBox.innerHTML.replace(typingAnimation, `<div class="message bot">${botReply}</div>`);

    // Scroll to bottom of the chat
    chatBox.scrollTop = chatBox.scrollHeight;
});
