import { useEffect, useState } from "react";
import MenuProfile from "../general/MenuProfile";
import RecipesList from "./RecipesList";
import authenticated from '../general/authenticated';
import '../../index.css';
import cookedAPI from "../APIs/cookedAPI";

const Cooked = () => {
    if (!authenticated.isLogged()) window.location.href = '/';

    const [items, setItems] = useState([]);

    useEffect(() => {
        cookedAPI.getAllCooked().then((cooked) => {
            setItems(cooked);
        }).catch((err) => console.log(err));
    }, [items])

    const deleteCooked = async (id) => {
        await cookedAPI.deleteCooked(id);
    }

    if(!items) return <>Loading...</>
    return <><MenuProfile />
        <br/>
        <h1 className="title text-center">Cooked</h1>
        <RecipesList items={items} val="Like" delete={deleteCooked} /></>
}

export default Cooked;