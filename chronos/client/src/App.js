import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import CreateCourse from './pages/createCourse';
import Agenda from './pages/agenda';
import PageEdt from './pages/pageEdt';
import FileImport from './pages/fileImport';
import Notes from './pages/notes';
import EmailForm from './pages/emailForm';
import LoginForm from './pages/loginForm';
import PageLogin from './pages/pageLogin';
import ChangePasswordForm from './pages/changePasswordForm';
import PagePasswordChange from './pages/pagePasswordChange';
import CallForm from './pages/call';
import CSVExportPage from './pages/exportExample';
import { PrivateRoute } from './routes/privateRoute';
import { AdminPrivateRoute } from './routes/adminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import TestAdmin from './pages/admin/test';
import Unauthorized from './pages/error/Unauthorized';
import NotFound from './pages/error/NotFound';

function App() {

  const [listCours, setListCours] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/cours").then((response) => {
      setListCours(response.data)
    })
  }, []) 

  return (

    <Router>
      { /* <Link to="/createcourse"> Créer un cours</Link>
      <Link to="/"> Accueil</Link> */ }
      <Header isVisible={false} links={[{title:"Calendrier", to:"/"}, {title: "notes", to:"/note"}]} />
      <Routes>
          <Route exact path='/' element={<PrivateRoute/>} />
          <Route path="/ade" element={<Agenda listCours={listCours}/>} exact />
          <Route path="/createcourse" element={<CreateCourse />} exact />
          <Route path="/" element={<PageEdt />} exact /> 
          <Route path="/importStudents" element={<FileImport />} exact />
          <Route path="/call" element={<CallForm />} exact />
          <Route path="/email" element={<EmailForm />} exact />
          <Route path="/export-csv" element={<CSVExportPage />} exact />
          <Route path="/notes" element={<Notes />} exact />

          {/* -------------- ADMIN ROUTES -----------------*/}
          <Route path='/admin/*' element={<AdminPrivateRoute/>} />
          <Route index element={<AdminDashboard />} />
          <Route path='test' element={<TestAdmin />} />{/* pour une URL de type /admin/test */}

          <Route path="/login" element={<LoginForm />} exact />
          <Route path="/loginNidal" element={<PageLogin />} exact />
          <Route path="/psw" element={<ChangePasswordForm />} exact />
          <Route path="/pswNidal" element={<PagePasswordChange />} exact />

          {/* -------------- PUBLIC ROUTES -----------------*/}
          <Route path="/login" element={<LoginForm />} exact />
          <Route path="/psw" element={<ChangePasswordForm />} exact />
          <Route path='/*' element={<NotFound /> }/>
          <Route path='/unauthorized' element={<Unauthorized/>} exact />
      </Routes>
    </Router>
  );
}

export default App;
