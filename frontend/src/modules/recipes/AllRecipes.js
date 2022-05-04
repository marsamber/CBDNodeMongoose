import { useEffect, useState } from "react";
import recipesAPI from "../APIs/recipesAPI";
import RecipesList from "./RecipesList";

const Recipes = () =>{
    
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        recipesAPI.getAllRecipes().then((recipes) => {
            setRecipes(recipes);
        }).catch((err) => console.log(err));
    }, [])

    return <RecipesList recipes = {recipes}/>
}

export default Recipes;