import HOST from "./host"

const favouriteAPI = {

    async getAllFavourites() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
        }
        return await fetch(`http://${HOST}:5000/api/favourite`, requestOptions)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },
}

export default favouriteAPI;