import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Recipe from './modules/recipes/Recipe'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
            <Route path='/' element={ <App />} />
            <Route path='/recipe/:id' element={<Recipe/>}/>
            <Route path='*' element={<Navigate replace to="/"/>}/>
        </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
