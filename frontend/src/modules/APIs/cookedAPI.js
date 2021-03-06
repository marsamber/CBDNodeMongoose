import authenticated from '../general/authenticated';
import HOST from './host';

const cookedAPI = {
  async getAllCooked() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/cooked`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async addCooked(recipeId, like) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
      body: JSON.stringify(like),
    };

    return await fetch(
      `http://${HOST}:5000/api/cooked/recipes/${recipeId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async deleteAllCooked() {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/cooked`, requestOptions)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },

  async deleteCooked(cookedId) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(
      `http://${HOST}:5000/api/cooked/${cookedId}`,
      requestOptions
    )
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },
};

export default cookedAPI;
