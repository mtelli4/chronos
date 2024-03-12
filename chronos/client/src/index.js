import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { authService } from './services/authService';

const root = ReactDOM.createRoot(document.getElementById('root'));

var headerRoutes = [
  {title:"Calendrier", to:"/"},
  {title: "Notes", to:"/notes"}
];

const currentRole = authService.getCurrentRole();

// Routes for admins/secretaires
if (['ROLE_SECRETARY', 'ROLE_ADMIN'].includes(currentRole)) {
  headerRoutes.push({title: "Imports", to:'/importStudents'});
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header links={headerRoutes} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);