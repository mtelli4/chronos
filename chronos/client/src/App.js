import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, {useEffect,useState} from 'react';
import PageEdt from './pages/pageEdt';

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
        <Route path="/" element={<PageEdt />} exact />
        {/* <Route path="/" element={<ClassSquare height={300} />} exact /> */}
      </Routes>
    </Router>
  );
}

export default App;
