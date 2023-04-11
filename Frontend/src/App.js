import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProfile from './pamudu/UserProfile';

import CreatePost from './pamudu/CreatePost';
import EditPost from './pamudu/EditPost';
import Home from './pamudu/Home';
import PostDetails from './pamudu/PostDetails';
import NavBar from './pamudu/NavBar';
import Login from './pamudu/Login';
import Register from './pamudu/Register';
import Dashboard from './pamudu/Dashboard';
import AddDetails from './pamudu/AddDetails';
import Employee from './pamudu/Employee';
import EditEmployee from './pamudu/EditEmployee';
import EditPeople from './pamudu/EditPeople';
import Profile from './pamudu/Profile';
import './App.css';
import CreateAcc from './pamudu/CreateAcc';
import Customer from './inthi/Customer';
import CusAdd from './inthi/CusAdd';
import CusEdit from './inthi/CusEdit';
import UserProfilePer from './pamudu/UserProfilePer';
import VendorLogin from './lasitha/VendorLogin';
import VendorRegister from  './lasitha/VendorRegister';
import VUserProfile from './lasitha/VUserProfile';


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <BrowserRouter>
      <div>
      

        <Routes>
          <Route exact path="/" element={isLoggedIn === 'true' ? <Dashboard/> : <Login/> } />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emp" element={<Employee />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/add" element={<CreatePost />} />
          <Route path="/editemp/:id" element={<EditEmployee />} />
          <Route path="/editpeople/:id" element={<EditPeople />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/addD" element={<AddDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/addP" element={<CreateAcc />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/CusEdit/:id" element={<CusEdit/>} />
          <Route path="/CusAdd" element={<CusAdd/>} />
          <Route path="/userProfilePer/:id" element={<UserProfilePer/>} />
          <Route path="/v" element={<VendorLogin/>} />
          <Route path="/Vregister" element={<VendorRegister/>} />
          <Route path="/Vuser" element={<VUserProfile/>} />
       


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
