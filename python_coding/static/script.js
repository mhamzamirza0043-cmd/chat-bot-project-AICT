async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    // Add user message to chat box
    addMessageToChat(message, 'user');
    messageInput.value = '';
    messageInput.focus();

    // Show loading indicator
    showLoadingIndicator();

    try {
        // Send message to backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Remove loading indicator
        removeLoadingIndicator();

        if (response.ok) {
            // Add bot response to chat box
            addMessageToChat(data.response, 'bot');
        } else {
            addMessageToChat('Sorry, something went wrong. Please try again.', 'bot');
            console.error('Error:', data.error);
        }
    } catch (error) {
        removeLoadingIndicator();
        addMessageToChat('Error: Unable to connect to the server.', 'bot');
        console.error('Error:', error);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function addMessageToChat(message, sender) {
    const chatBox = document.getElementById('chatBox');

    // Remove welcome message if it exists
    const welcomeMessage = chatBox.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = escapeHtml(message).replace(/\n/g, '<br>');

    messageDiv.appendChild(messageContent);
    chatBox.appendChild(messageDiv);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showLoadingIndicator() {
    const chatBox = document.getElementById('chatBox');

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot';
    loadingDiv.id = 'loadingIndicator';

    loadingDiv.innerHTML = '<div class="loading"><div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div></div>';

    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

async function clearChat() {
    if (confirm('Are you sure you want to clear the chat?')) {
        try {
            const response = await fetch('/clear', { method: 'POST' });

            if (response.ok) {
                const chatBox = document.getElementById('chatBox');
                chatBox.innerHTML = `
                    <div class="welcome-message">
                        <div class="welcome-icon">👋</div>
                        <h2>Welcome to AI Chat Bot</h2>
                        <p>Start a conversation about anything. I'm here to help!</p>
                    </div>
                `;
                document.getElementById('messageInput').focus();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Focus input on page load
window.addEventListener('load', function () {
    document.getElementById('messageInput').focus();
});
