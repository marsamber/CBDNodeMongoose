import authenticated from "../general/authenticated";
import HOST from "./host"

const toBuy = {
    async deleteAllToBuy() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authenticated.getStorage("token")}` },
        }
        return await fetch(`http://${HOST}:5000/api/toBuy`, requestOptions)
            .then((res) => {
                return res;
            }).catch((err) => console.log(err));
    },

    async addToBuy(ingredient) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authenticated.getStorage("token")}` },
            body: JSON.stringify(ingredient)
        }

        return await fetch(`http://${HOST}:5000/api/toBuy`, requestOptions)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },
}

export default toBuy;