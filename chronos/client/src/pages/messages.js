import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authService } from '../services/authService';

const MessageForm = ({ onMessageSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

const MessageList = ({ messages }) => (
  <ul>
    {messages.map((message) => (
      <li key={message.id}>
        <strong>{message.Utilisateur.nom} {message.Utilisateur.prenom}</strong>: {message.content}
      </li>
    ))}
  </ul>
);

const MessageApp = ({coursId ,moduleId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canSendMessage, setCanSendMessage] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/messages/${moduleId}`);
        setMessages(response.data);
        const role = authService.getCurrentRole()
        const roleId = authService.getCurrentRoleId()
        const response2 = await axios.get(`http://localhost:5000/messages/canSendMessage/${moduleId}/${coursId}/${role}/${roleId}`);
        setCanSendMessage(response2.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Rafraîchir les messages toutes les 12 secondes
    const intervalId = setInterval(fetchMessages, 12000);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [moduleId]);

  const handleSendMessage = async (content) => {
    try {
      await axios.post('http://localhost:5000/messages/send', {
        content,
        UtilisateurId: authService.getUserId(),
        ModuleId: moduleId,
      });

      // Rafraîchir la liste des messages après l'envoi
      const response = await axios.get(`http://localhost:5000/messages/${moduleId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <>
          <MessageList messages={messages} />
          {canSendMessage && <MessageForm onMessageSubmit={handleSendMessage} />}
        </>
      )}
    </div>
  );
};

export default MessageApp;
