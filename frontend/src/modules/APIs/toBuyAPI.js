import authenticated from '../general/authenticated';
import HOST from './host';

const toBuyAPI = {
  async deleteAllToBuy() {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/toBuy`, requestOptions)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },

  async addToBuy(toBuy) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
      body: JSON.stringify(toBuy),
    };

    return await fetch(`http://${HOST}:5000/api/toBuy`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
  async getAllToBuy() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/toBuy`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async deleteToBuy(toBuyId) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };

    return await fetch(
      `http://${HOST}:5000/api/toBuy/${toBuyId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
};

export default toBuyAPI;
