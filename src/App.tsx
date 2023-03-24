import React from 'react';
import './App.css';
import { LandingPage } from './components/LandingPage/LadingPage';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/register" element={<Form text='Register' />}></Route>
        <Route path="/login" element={<Form text='Log in' />}></Route>
      </Routes>
    </div>
  );
}

export default App;
