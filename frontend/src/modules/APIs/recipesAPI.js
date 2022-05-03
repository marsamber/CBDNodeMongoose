import HOST from "./host"

const recipesAPI = {

    async getAllRecipes() {
        return await fetch(`http://${HOST}:5000/api/recipes`)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },

    async getRecipesSearched(toSearch) {
        return await fetch(`http://${HOST}:5000/api/recipes?search=${toSearch}`)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },

    async getRecipeById(recipeId) {
        return await fetch(`http://${HOST}:5000/api/recipes/${recipeId}`)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },

    async addComment(recipeId, c) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(c),
        }

        return await fetch(`http://localhost:5000/api/recipes/${recipeId}/comments`, requestOptions)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },
}

export default recipesAPI;