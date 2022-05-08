import authenticated from "../general/authenticated";
import HOST from "./host";

const toBuyAPI = {
  async getAllToBuy() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/toBuy`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async addToBuy( c) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
      body: JSON.stringify(c),
    };

    return await fetch(`http://localhost:5000/api/toBuy`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
  async deleteToBuy(toBuyId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
    };

    return await fetch(
      `http://localhost:5000/api/toBuy/${toBuyId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
};

export default toBuyAPI;
