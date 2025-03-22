import React, { useState } from 'react';
import styled from 'styled-components';
import { FaComments } from 'react-icons/fa';

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  display: ${props => (props.visible ? 'block' : 'none')};
`;

const ChatHeader = styled.div`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatBody = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const ChatInput = styled.input`
  width: calc(100% - 50px);
  padding: 5px;
`;

const SendButton = styled.button`
  width: 40px;
  padding: 5px;
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: ${props => (props.visible ? 'none' : 'block')};
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);

  const apiKey = '5b0bc107416d4ea3be763f560886b535'; // Replace with your actual API key
  const baseURL = 'https://api.aimlapi.com/v1';
  const systemPrompt = 'You are a helpful assistant. Be descriptive and helpful';

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch(`${baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "max_tokens": 512,
          "stream": false,
          "model": "gpt-4o-mini-2024-07-18",
          "logit_bias": {},
          "stream_options": {
            "include_usage": true
          },
          "tools": [
            {
              "type": "function",
              "function": {
                "description": "text",
                "name": "text"
              }
            }
          ],
          "tool_choice": "none",
          "response_format": {
            "type": "text"
          },
          "messages": [
            {
              "role": "system",
              "content": systemPrompt
            },
            {
              "role": "user",
              "content": input
            }
          ]
        }),
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', text: data.choices[0].message.content };
      setMessages([...messages, userMessage, botMessage]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ToggleButton visible={visible} onClick={() => setVisible(true)}>
        <FaComments />
      </ToggleButton>
      <ChatbotContainer visible={visible}>
        <ChatHeader>
          <span>Chatbot</span>
          <button onClick={() => setVisible(false)}>X</button>
        </ChatHeader>
        <ChatBody>
          {messages.map((message, index) => (
            <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
              <p style={{ margin: '5px 0' }}><strong>{message.sender === 'user' ? 'You' : 'Bot'}:</strong> {message.text}</p>
            </div>
          ))}
        </ChatBody>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <SendButton onClick={handleSend}>Send</SendButton>
        </ChatInputContainer>
      </ChatbotContainer>
    </>
  );
};

export default Chatbot;