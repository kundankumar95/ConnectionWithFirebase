import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './components/Home';
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
