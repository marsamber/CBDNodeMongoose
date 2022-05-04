import { useEffect, useState } from "react";
import MenuProfile from "../general/MenuProfile";
import RecipesList from "./RecipesList";
import authenticated from '../general/authenticated';
import '../../index.css';
import favouriteAPI from "../APIs/favouriteAPI";

const Favourites = () => {
    if (!authenticated.isLogged()) window.location.href = '/';

    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        favouriteAPI.getAllFavourites().then((favourites) => {
            var recipes = [];
            for (let i = 0; i < favourites.length; i++) {
                const fav = favourites[i];
                recipes.push(fav.recipe)
            }
            setRecipes(recipes);
        }).catch((err) => console.log(err));
    }, [])

    if(!recipes) return <>Loading...</>
    return <><MenuProfile />
        <br/>
        <h1 className="title text-center">Favourites</h1>
        <RecipesList recipes={recipes} /></>
}

export default Favourites;