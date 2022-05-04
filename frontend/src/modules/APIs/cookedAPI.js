import HOST from "./host"

const cookedAPI = {

    async getAllCooked() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
        }
        return await fetch(`http://${HOST}:5000/api/cooked`, requestOptions)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },
}

export default cookedAPI;