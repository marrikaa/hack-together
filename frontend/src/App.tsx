import React, { useContext, useEffect } from 'react';
import './App.css';
import { LandingPage } from './components/LandingPage/LadingPage';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import { AppContext } from './context/AppContext';
import { Profile } from './components/Profile/Profile';


function App() {

  const { getUser, user } = useContext(AppContext);
  useEffect(() => {
    getUser()
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path={`/profile/:username`} element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
