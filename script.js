const chatDisplay = document.getElementById('chat-display');
const userInputBox = document.getElementById('user-input-box');
const sendButton = document.getElementById('send-btn');

const API_KEY = 'sk-proj-L2TyF214GJIy3uBcvf6DT3BlbkFJH6MPRK89W7iCURwjVghR';
const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

sendButton.addEventListener('click', async () => {
    const userMessage = userInputBox.value.trim();
    if (userMessage === '') return;

    appendMessage('user', userMessage);
    userInputBox.value = '';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            prompt: userMessage,
            max_tokens: 150
        })
    });

    if (!response.ok) {
        console.error('Error al enviar la solicitud a OpenAI');
        return;
    }

    const data = await response.json();
    const aiMessage = data.choices[0].text.trim();
    appendMessage('ai', aiMessage);
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatDisplay.appendChild(messageElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
