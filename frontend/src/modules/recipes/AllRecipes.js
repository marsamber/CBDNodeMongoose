import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import recipesAPI from "../APIs/recipesAPI";
import RecipesList from "./RecipesList";
import SearchRecipes from "./SearchRecipes";

const Recipes = () => {

    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        recipesAPI.getAllRecipes().then((recipes) => {
            setRecipes(recipes);
        }).catch((err) => console.log(err));
    }, [])

    return (<>
        <br />
        <Container><SearchRecipes /></Container>
        <RecipesList recipes={recipes} />
    </>)
}

export default Recipes;