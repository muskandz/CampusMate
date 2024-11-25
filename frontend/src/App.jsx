import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Notes from './components/Notes/Notes';
import FacultyProfiles from './components/FacultyProfiles/FacultyProfiles';
import AuthProvider from './context/AuthContext';

function App() {
    const rollNumber = localStorage.getItem('rollNumber');

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard rollNumber={rollNumber} />} />
                    <Route path="/notes" element={<Notes rollNumber={rollNumber} />} />
                    <Route path="/faculty-profiles" element={<FacultyProfiles rollNumber={rollNumber} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;