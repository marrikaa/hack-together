import React, { useContext, useEffect } from 'react';
import './App.css';
import { LandingPage } from './components/LandingPage/LadingPage';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import { AppContext } from './context/AppContext';
import { Profile } from './components/Profile/Profile';
import { ProjectList } from './components/ProjectList/ProjectList';
import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import MyProjects from './components/MyProjects/MyProjects';
import CreateProject from './components/CreateProject/CreateProject';


function App() {

  const { getUser, user } = useContext(AppContext);

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className="App">
      <Header />
      <div className='application-box'>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path={`/profile/:username`} element={<Profile />}></Route>
          <Route path="/projectlist" element={<ProjectList />}></Route>
          <Route path="/createproject" element={<CreateProject />}></Route>
          <Route path='/project/:projectId' element={<ProjectDetails />}></Route>
          <Route path='/profile/:username/projects' element={<MyProjects />}></Route>
        </Routes>
      </div>
      <button onClick={() => console.log(user)}>show state</button>
    </div >
  );
}

export default App;
