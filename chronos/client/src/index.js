import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { authService } from './services/authService';

const root = ReactDOM.createRoot(document.getElementById('root'));

let headerRoutes = [
  {title:"Calendrier", to:"/"},
  {title: "Notes", to:"/note"}
];

const currentRole = authService.getCurrentRole();

// Routes for admins/secretaires
if (['ROLE_SECRETARY', 'ROLE_ADMIN'].includes(currentRole)) {
  headerRoutes.push({title: "Imports", to:'/importStudents'});
}

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);