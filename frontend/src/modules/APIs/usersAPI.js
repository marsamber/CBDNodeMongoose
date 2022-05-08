import authenticated from "../general/authenticated";
import HOST from "./host"

const usersAPI = {
    signIn(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": user.username,
            "password": user.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/users/login", requestOptions)
            .then(async response => {
                const res = await response.json();
                console.log(res);
                authenticated.setStorage("token", res.token, 3600);
                const userLogged = await this.getUserByUsername(user.username);
                authenticated.setStorage("user", JSON.stringify(userLogged), 3600);
                window.location.href = "/";
            })
            .then(result => console.log(result))
            .catch(error => alert("Incorrect username or password"));
    },
    signUp(user) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        }
        fetch(`http://${HOST}:5000/users/signup`, requestOptions)
            .then(async (res) => {
                await this.signIn(user);
            }).catch((err) => alert(err));
    },
    async getUserByUsername(username) {
        return await fetch(`http://${HOST}:5000/users/username/${username}`)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },
}

export default usersAPI;