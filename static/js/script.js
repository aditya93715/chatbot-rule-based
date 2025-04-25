const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';
  userInput.disabled = true;

  // Show "typing" indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('message', 'bot');
  typingIndicator.textContent = '🤖 Typing...';
  chatBox.appendChild(typingIndicator);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch('/get_response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();

    // Remove typing indicator
    chatBox.removeChild(typingIndicator);

    appendMessage('bot', data.response);
  } catch (error) {
    chatBox.removeChild(typingIndicator);
    appendMessage('bot', "⚠️ Oops! Something went wrong.");
  }

  userInput.disabled = false;
  userInput.focus();
});
