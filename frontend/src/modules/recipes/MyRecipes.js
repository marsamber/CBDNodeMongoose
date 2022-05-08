import { useEffect, useState } from 'react';
import usersAPI from '../APIs/usersAPI';
import MenuProfile from '../general/MenuProfile';
import RecipesList from './RecipesList';
import '../../index.css';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import authenticated from '../general/authenticated';
import NewRecipe from './NewRecipe';
import recipesAPI from '../APIs/recipesAPI';

const MyRecipes = () => {
  if (!authenticated.isLogged()) window.location.href = '/';

  const [modal, setModal] = useState(0);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const user = authenticated.getStorage('user');
    if (user) {
      usersAPI
        .getUserByUsername(JSON.parse(user).username)
        .then((user) => {
          setRecipes(user.recipes);
        })
        .catch((err) => console.log(err));
    }
  }, [recipes]);

  const deleteMyRecipe = async (id) => {
    await recipesAPI.deleteRecipe(id);
  };
  return (
    <>
      <MenuProfile />
      <br />
      <h1 className='title text-center'>My Recipes</h1>
      <Container>
        <Button
          id='btnPag'
          style={{ float: 'right' }}
          onClick={() => setModal(1)}
        >
          <FontAwesomeIcon icon={faPlus} /> Recipe
        </Button>
      </Container>
      <br /><br/>
      <RecipesList recipes={recipes} delete={deleteMyRecipe} />
      <NewRecipe show={modal} onHide={() => setModal(0)} />
    </>
  );
};

export default MyRecipes;
