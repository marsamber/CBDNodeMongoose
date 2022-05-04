import { useEffect, useState } from "react";
import usersAPI from "../APIs/usersAPI";
import MenuProfile from "../general/MenuProfile";
import RecipesList from "./RecipesList";
import isLogged from '../general/authenticated';
import '../../index.css';
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MyRecipes = () => {
    if (!isLogged()) window.location.href = '/';

    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const username = localStorage.getItem("username");
        usersAPI.getUserByUsername(username).then((user) => {
            setRecipes(user.recipes);
        }).catch((err) => console.log(err));
    }, [])

    return <><MenuProfile />
        <br />
        <h1 className="title text-center">My Recipes</h1>
        <Container><Button id='btnPag' style={{ float: "right" }}><FontAwesomeIcon icon={faPlus} /> Recipe</Button></Container>
        <RecipesList recipes={recipes} /></>
}

export default MyRecipes;