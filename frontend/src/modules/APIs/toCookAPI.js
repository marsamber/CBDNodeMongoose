import HOST from "./host"

const toCookAPI = {

    async getAllToCook() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
        }
        return await fetch(`http://${HOST}:5000/api/toCook`, requestOptions)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },
}

export default toCookAPI;