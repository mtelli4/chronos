import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authService } from '../services/authService';
import "../css/styleMessages.css"
import { ChronosInputField } from '../components/ChronosInput/ChronosInputElements';
import ChronosInput from '../components/ChronosInput';

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
        className='messageInput'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Quelque chose d'interressant ..."
      />
      <button hidden type="submit">Send</button>
    </form>
  );
};

const MessageList = ({ messages }) => (
  <ul className='messageViewCont'>
    {messages.map((message) => (
      <li key={message.id}>
        <div className='messageViewContTitle'>{message.Utilisateur.nom} {message.Utilisateur.prenom}</div>
        <div className='messageViewContMessage'>
          {message.content}
        </div>
      </li>
    ))}
  </ul>
);

const MessageApp = ({coursId ,moduleId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [canSendMessage, setCanSendMessage] = useState(true);

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
    <>
      {loading ? (
        <p>Chargement des messages ...</p>
      ) : (
        <>
          <MessageList messages={messages} />
          {canSendMessage && <MessageForm onMessageSubmit={handleSendMessage} />}
        </>
      )}
    </>
  );
};

export default MessageApp;
