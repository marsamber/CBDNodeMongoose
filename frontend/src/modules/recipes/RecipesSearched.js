import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipesAPI from "../APIs/recipesAPI";
import RecipesList from "./RecipesList";

const RecipesSearched = () => {

    const [recipes, setRecipes] = useState(null);
    const params = useParams();
    const toSearch = params.toSearch;

    useEffect(() => {
        recipesAPI.getRecipesSearched(toSearch).then((recipes) => {
            setRecipes(recipes);
        }).catch((err) => console.log(err));
    }, [toSearch])

    return <RecipesList recipes={recipes} />
}

export default RecipesSearched;