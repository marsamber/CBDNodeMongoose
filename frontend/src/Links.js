import { BrowserRouter, Route, Routes, Navigate, Router } from 'react-router-dom';
import App from './App';
import Recipe from './modules/recipes/Recipe'



const Links = () => {

<Routes>
            <Route path='/' element={ <App />} />
            <Route path='/receta/:id' element={<Recipe/>}/>
            <Route path='*' element={<Navigate replace to="/"/>}/>
        </Routes>
}

export default Links;