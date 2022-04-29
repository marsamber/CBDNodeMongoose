import HOST from "./host"

const recipesAPI = {

    async getAllRecipes() {
        return await fetch(`http://${HOST}:5000/api/recipes`)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    },

    async getRecipeById(recipeId) {
        return await fetch(`http://${HOST}:5000/api/recipes/${recipeId}`)
            .then((res) => {
                return res.json();
            }).catch((err) => console.log(err));
    }
}

export default recipesAPI;