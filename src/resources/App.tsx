
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { HeadManager } from './components/HeadManager';
import AppBar from './components/AppBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css';
import './config/i18n.ts';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeadManager />
        <AppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
