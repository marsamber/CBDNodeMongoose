import authenticated from "../general/authenticated";
import HOST from "./host";

const cookedAPI = {
  async getAllCooked() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/cooked`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async addCooked(recipeId, c) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
    };

    return await fetch(
      `http://localhost:5000/api/cooked/recipes/${recipeId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
  async deleteCooked(cookedId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authenticated.getStorage("token")}`,
      },
    };

    return await fetch(
      `http://localhost:5000/api/cooked/${cookedId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
};

export default cookedAPI;
