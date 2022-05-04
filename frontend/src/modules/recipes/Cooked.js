import { useEffect, useState } from "react";
import MenuProfile from "../general/MenuProfile";
import RecipesList from "./RecipesList";
import isLogged from '../general/authenticated';
import '../../index.css';
import cookedAPI from "../APIs/cookedAPI";

const Cooked = () => {
    if (!isLogged()) window.location.href = '/';

    const [recipes, setRecipes] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        cookedAPI.getAllCooked().then((cooked) => {
            setItems(cooked);
            var recipes = [];
            for (let i = 0; i < cooked.length; i++) {
                const c = cooked[i];
                recipes.push(c.recipe)
            }
            setRecipes(recipes);
        }).catch((err) => console.log(err));
    }, [])

    if(!recipes) return <>Loading...</>
    return <><MenuProfile />
        <br/>
        <h1 className="title text-center">Cooked</h1>
        <RecipesList recipes={recipes} items={items} val="like" /></>
}

export default Cooked;