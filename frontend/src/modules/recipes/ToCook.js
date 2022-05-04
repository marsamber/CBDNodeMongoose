import { useEffect, useState } from "react";
import MenuProfile from "../general/MenuProfile";
import RecipesList from "./RecipesList";
import isLogged from '../general/authenticated';
import '../../index.css';
import toCookAPI from "../APIs/toCookAPI";

const ToCook = () => {
    if (!isLogged()) window.location.href = '/';

    const [recipes, setRecipes] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        toCookAPI.getAllToCook().then((toCook) => {
            setItems(toCook);
            var recipes=[];
            for (let i = 0; i < toCook.length; i++) {
                const tc = toCook[i];
                recipes.push(tc.recipe)
            }
            setRecipes(recipes);
        }).catch((err) => console.log(err));
    }, [])

    if(!recipes) return <>Loading...</>
    return <><MenuProfile />
        <br/>
        <h1 className="title text-center">To Cook</h1>
        <RecipesList recipes={recipes} items={items} val="priority" /></>
}

export default ToCook;