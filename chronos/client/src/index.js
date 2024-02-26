import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header links={[{title:"Calendrier", to:"/"}, {title: "notes", to:"/note"}]} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);