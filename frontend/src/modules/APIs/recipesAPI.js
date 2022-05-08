import authenticated from '../general/authenticated';
import HOST from './host';

const recipesAPI = {
  async getAllRecipes() {
    return await fetch(`http://${HOST}:5000/api/recipes`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async populateRecipes() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    return await fetch(`http://${HOST}:5000/api/recipes/import`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async addRecipe(recipe) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
      body: JSON.stringify(recipe),
    };

    return await fetch(`http://${HOST}:5000/api/recipes/`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async addComment(recipeId, c) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
      body: JSON.stringify(c),
    };

    return await fetch(
      `http://${HOST}:5000/api/recipes/${recipeId}/comments`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async deleteRecipe(recipeId) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(
      `http://${HOST}:5000/api/recipes/${recipeId}`,
      requestOptions
    )
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },

  async deleteAllRecipes() {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/recipes`, requestOptions)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },

  async deleteAllComments() {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };
    return await fetch(`http://${HOST}:5000/api/comments`, requestOptions)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },
  async getRecipesSearched(toSearch) {
    return await fetch(`http://${HOST}:5000/api/recipes?search=${toSearch}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async getRecipeById(recipeId) {
    return await fetch(`http://${HOST}:5000/api/recipes/${recipeId}`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },

  async deleteComment(commentId) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticated.getStorage('token')}`,
      },
    };

    return await fetch(
      `http://localhost:5000/api/comments/${commentId}`,
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  },
};

export default recipesAPI;
