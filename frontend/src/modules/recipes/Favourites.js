import { useEffect, useState } from "react";
import MenuProfile from "../general/MenuProfile";
import RecipesList from "./RecipesList";
import authenticated from '../general/authenticated';
import '../../index.css';
import favouriteAPI from "../APIs/favouriteAPI";

const Favourites = () => {
    if (!authenticated.isLogged()) window.location.href = '/';

    const [items, setItems] = useState([]);
    useEffect(() => {
        favouriteAPI.getAllFavourites().then((favourites) => {
            setItems(favourites);
        }).catch((err) => console.log(err));
    }, [items])

    const deleteFavourite = async(id) =>{
        await favouriteAPI.deleteFavourite(id);
    }

    if(!items) return <>Loading...</>
    return <><MenuProfile />
        <br/>
        <h1 className="title text-center">Favourites</h1>
        <RecipesList items={items} delete={deleteFavourite}/></>
}

export default Favourites;