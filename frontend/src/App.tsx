import React from 'react';
import './App.css';
import { LandingPage } from './components/LandingPage/LadingPage';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
