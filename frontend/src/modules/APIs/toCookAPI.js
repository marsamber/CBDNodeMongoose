import authenticated from "../general/authenticated";
import HOST from "./host";

const toCookAPI = {
  async getAllToCook() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/toCook`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async addToCook(recipeId, c) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
      body: JSON.stringify(c),
    };

    return await fetch(
      `http://localhost:5000/api/toCook/recipes/${recipeId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
  async deleteToCook(toCookId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
    };

    return await fetch(
      `http://localhost:5000/api/toCook/${toCookId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
};

export default toCookAPI;
