import { useEffect, useState } from "react";
import MenuProfile from "../general/MenuProfile";
import RecipesList from "./RecipesList";
import authenticated from '../general/authenticated';
import '../../index.css';
import toCookAPI from "../APIs/toCookAPI";

const ToCook = () => {
    if (!authenticated.isLogged()) window.location.href = '/';

    const [items, setItems] = useState([]);

    useEffect(() => {
        toCookAPI.getAllToCook().then((toCook) => {
            setItems(toCook);
        }).catch((err) => console.log(err));
    }, [items])

    const sortByPriority = (a,b) => {
        if (a.priority === "HIGH") {
            if (b.priority === "HIGH") {
                return (a.recipe.title > b.recipe.title) ? 1 : ((b.recipe.title > a.recipe.title) ? -1 : 0);
            } else {
                return -1;
            }
        } else if (b.priority === "HIGH") {
            return 1;
        } else if (a.priority === "LOW") {
            if (b.priority === "LOW") {
                return (a.recipe.title > b.recipe.title) ? 1 : ((b.recipe.title > a.recipe.title) ? -1 : 0);
            } else {
                return 1;
            }
        } else if (b.priority === "LOW") {
            return -1;
        } else {
            return (a.recipe.title > b.recipe.title) ? 1 : ((b.recipe.title > a.recipe.title) ? -1 : 0);
        }
    }

    const deleteToCook = async (id) => {
        await toCookAPI.deleteToCook(id);
    }

    if(!items) return <>Loading...</>
    return <><MenuProfile />
        <br/>
        <h1 className="title text-center">To Cook</h1>
        <RecipesList items={items} sortByPriority={sortByPriority} val="Priority" delete = {deleteToCook} /></>
}

export default ToCook;