
import React from "react";
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState.jsx';
import Alert from './components/Alert.jsx';

function App() {

  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="this is amazing"/>
        <div className="container "  >
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/About" element={<About />}/>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  )
}

export default App
