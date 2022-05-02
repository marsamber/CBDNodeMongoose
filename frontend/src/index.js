import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Recipe from './modules/recipes/Recipe'
import PrincipalNavbar from './modules/general/PrincipalNavbar';
import SignIn from './modules/general/SignIn';
import SignUp from './modules/general/SignUp';

ReactDOM.render(
  <BrowserRouter>
    <PrincipalNavbar />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path='/recipe/:id' element={<Recipe />} />
      <Route path='*' element={<Navigate replace to="/" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
