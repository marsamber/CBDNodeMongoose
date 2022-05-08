import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Recipe from './modules/recipes/Recipe'
import PrincipalNavbar from './modules/general/PrincipalNavbar';
import SignIn from './modules/general/SignIn';
import SignUp from './modules/general/SignUp';
import AllRecipes from './modules/recipes/AllRecipes';
import RecipesSearched from './modules/recipes/RecipesSearched';
import MyRecipes from './modules/recipes/MyRecipes';
import Favourites from './modules/recipes/Favourites';
import Cooked from './modules/recipes/Cooked';
import ToCook from './modules/recipes/ToCook';
import ToBuy from './modules/recipes/ToBuy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <PrincipalNavbar />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/recipes" element={<AllRecipes />} />
      <Route path="/recipes/search/:toSearch" element={<RecipesSearched />}/>
      <Route path='/recipe/:id' element={<Recipe />} />
      <Route path='/myRecipes' element={<MyRecipes />} />
      <Route path='/favourites' element={<Favourites />} />
      <Route path='/cooked' element={<Cooked />} />
      <Route path='/toCook' element={<ToCook />} />
      <Route path='/toBuy' element={<ToBuy />} />
      <Route path='*' element={<Navigate replace to="/" />} />
    </Routes>
  </BrowserRouter>,
  
);
