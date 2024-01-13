import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Button from './components/Button';
import React, {useEffect,useState} from 'react';
import PageExemple from './pages/pageExemple';
import ClassSquare from './components/ClassSquare';
import Calendar from './components/Calendar';

function App() {
  const [backendData, setBackendData] = useState([{}])

  //test api back
  /*useEffect(() => {
    fetch("/api").then(
      response => response.json()
    )
    .then(
      data => {
        setBackendData(data)
      }
    )
  })*/

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Calendar />} exact /> */}
        <Route path="/" element={<ClassSquare height={300} />} exact />
      </Routes>
    </Router>
  );
}

export default App;
