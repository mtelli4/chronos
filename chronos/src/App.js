import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Button from './components/Button';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Button />} exact />
      </Routes>
    </Router>
  );
}

export default App;
