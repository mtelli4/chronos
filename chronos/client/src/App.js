import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import CreateCourse from './pages/createCourse';
import Agenda from './pages/agenda';
import PageEdt from './pages/pageEdt';
import Notes from './pages/notes';
import EmailForm from './pages/emailForm';
import PageLogin from './pages/pageLogin';
import PagePasswordChange from './pages/pagePasswordChange';
import CallForm from './pages/call';
import JustifyAbsPage from './pages/justifyAbsences';
import ValidationAbsPage from './pages/validateAbsences';
import CSVExportPage from './pages/exportExample';
import { PrivateRoute } from './routes/privateRoute';
import { AdminPrivateRoute } from './routes/adminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import TestAdmin from './pages/admin/test';
import Unauthorized from './pages/error/Unauthorized';
import NotFound from './pages/error/NotFound';
import Header from "./components/Header"
import PageNotes from './pages/pageNotes';
import PageImportEleves from './pages/pageImportEleves';
import Users from './pages/users';
import { authService } from './services/authService';
import ForgotPasswordPage from './pages/forgotPassword';

import MessageApp from './pages/messages';
function App() {

  const [listCours, setListCours] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/cours").then((response) => {
      setListCours(response.data)
    })
  }, [])

  const [headerVisibility, setHeaderVisibility] = useState(true);
  const [navVisible, setNavVisible] = useState(false);

  let headerRoutes = [
    {title:"Calendrier", to:"/"},
    {title: "Notes", to:"/notes"}
  ];
  
  const currentRole = authService.getCurrentRole();
  
  // Routes for admins/secretaires
  if (['ROLE_SECRETARY', 'ROLE_ADMIN', 'ROLE_SUPERADMIN'].includes(currentRole)) {
    headerRoutes.push({title: "Imports", to:'/importStudents'});
    headerRoutes.push({title: "Utilisateurs", to:'/users'})
  }
  
  return (

    <Router>
      <Header setNavVisible={setNavVisible} isVisible={headerVisibility} links={headerRoutes} />
      { /* <Link to="/createcourse"> Créer un cours</Link>
      <Link to="/"> Accueil</Link> */ }
        <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path="/ade" element={<Agenda listCours={listCours}/>} exact />
            <Route path="/createcourse" element={<CreateCourse />} exact />
            <Route path="/" element={<PageEdt />} exact /> 
            <Route path="/importStudents" element={<PageImportEleves />} exact />
            <Route path="/users" element={<Users />} exact />
          
            <Route path="/email" element={<EmailForm />} exact />
            <Route path="/export-csv" element={<CSVExportPage />} exact />
            <Route path="/notes" element={<Notes />} exact />
            <Route path="/notesNidal" element={<PageNotes />} exact />

            {/* Pages absences Kyrian */}
            <Route path="/call" element={<CallForm />} exact />
            <Route path="/justif-abs" element={<JustifyAbsPage />} exact />
            <Route path="/valid-abs" element={<ValidationAbsPage />} exact />
            <Route path='/admin/*' element={<AdminPrivateRoute/>}>
              <Route index element={<AdminDashboard />} />
              <Route path='test' element={<TestAdmin />} />{/* pour une URL de type /admin/test */}
            </Route>
          </Route>

        {/* -------------- PUBLIC ROUTES -----------------*/}
        <Route path="/login" element={<PageLogin />} exact />
        <Route path="/psw" element={<PagePasswordChange />} exact />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} exact />
        <Route path='/*' element={<NotFound /> }/>
        <Route path='/unauthorized' element={<Unauthorized/>} exact />
       
        {/* <Route path="/" element={<ClassSquare height={300} />} exact /> */}
      </Routes>
    </Router>
  );
}

export default App;
