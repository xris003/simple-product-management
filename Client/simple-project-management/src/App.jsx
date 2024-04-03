import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import './App.css';
import SignUp from './components/signup';
import Login from './components/login';
import UploadForm from './components/upload';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Route */}
        <Route path="/" element={<SignUp />} /> 
        <Route path="login" element={<Login />} /> 
        <Route path="dashboard" element={<Dashboard />} /> 
        <Route path="uploadform" element={<UploadForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
