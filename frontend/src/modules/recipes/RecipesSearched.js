import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import recipesAPI from "../APIs/recipesAPI";
import RecipesList from "./RecipesList";
import SearchRecipes from "./SearchRecipes";

const RecipesSearched = () => {

    const [recipes, setRecipes] = useState([]);
    const params = useParams();
    const toSearch = params.toSearch;

    useEffect(() => {
        recipesAPI.getRecipesSearched(toSearch).then((recipes) => {
            setRecipes(recipes);
        }).catch((err) => console.log(err));
    }, [toSearch])

    return (<>
        <br />
        <Container><SearchRecipes /></Container>
        <RecipesList recipes={recipes} />
    </>)
}

export default RecipesSearched;