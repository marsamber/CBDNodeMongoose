import HOST from "./host"
import authenticated from '../general/authenticated'

const favouriteAPI = {

    async getAllFavourites() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authenticated.getStorage("token")}` },
        }
        return await fetch(`http://${HOST}:5000/api/favourite`, requestOptions)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },

    async addFavourite(recipeId) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authenticated.getStorage("token")}` }
        }

        return await fetch(`http://${HOST}:5000/api/favourite/recipes/${recipeId}`, requestOptions)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },

    async deleteFavourite(favouriteId) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authenticated.getStorage("token")}` },
        }
        return await fetch(`http://${HOST}:5000/api/favourite/${favouriteId}`, requestOptions)
            .then((res) => {
                return res;
            }).catch((err) => console.log(err));
    },

    async deleteAllFavourite() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authenticated.getStorage("token")}` },
        }
        return await fetch(`http://${HOST}:5000/api/favourite`, requestOptions)
            .then((res) => {
                return res;
            }).catch((err) => console.log(err));
    },
}

export default favouriteAPI;