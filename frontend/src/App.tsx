import React, { useContext, useEffect } from 'react';
import './App.css';
import { LandingPage } from './components/LandingPage/LadingPage';
import Header from './components/Header/Header';
import { Route, Routes } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import { AppContext } from './context/AppContext';
import Profile from './components/Profile/Profile';
import ProjectList from './components/ProjectList/ProjectList';
import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import MyProjects from './components/MyProjects/MyProjects';
import CreateProject from './components/CreateProject/CreateProject';
import AllUsers from './components/AllUsers/AllUsers';
import { LandingImage } from './components/LandingImage/LandingImage';
import { Home } from './components/Home/Home';
import { MailBox } from './components/MailBox/MailBox';
import { Conversation } from './components/Conversation/Conversation';
import ImageUpload from './components/ImageUpload/ImageUpload';
import BackArrow from './components/BackArrow/BackArrow';




function App() {

  const { getUser, user } = useContext(AppContext);

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className="App">
      <Header />
      <BackArrow />
      <div className='application-box'>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path={`/profile/:username`} element={<Profile />}></Route>
          <Route path="/projectlist" element={<ProjectList />}></Route>
          <Route path="/allUsers" element={<AllUsers />}></Route>
          <Route path="/about" element={<LandingPage />}></Route>
          <Route path="/createproject" element={<CreateProject />}></Route>
          <Route path="/messages" element={<MailBox />}></Route>

          <Route path='/project/:projectId' element={<ProjectDetails />}></Route>
          <Route path='/conversation/:receiverUsername' element={<Conversation />}></Route>
          {/* <Route path='/profile/:username/projects' element={<MyProjects />}></Route> */}

        </Routes>
      </div>

    </div >
  );
}

export default App;
