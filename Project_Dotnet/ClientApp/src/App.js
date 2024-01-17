import React from 'react';
import {Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import HomeWelcome from './components/pages/HomeWelcome';

function App() {

    return (
        <>
            <NavBar />
            <Routes> {/* Use Routes to define multiple routes */}
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<Home />} />
                <Route path="/welcome" element={<HomeWelcome />} />
            </Routes>
        </>
    );
}

export default App;
