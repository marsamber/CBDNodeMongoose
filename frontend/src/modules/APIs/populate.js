import authenticated from '../general/authenticated';
import cookedAPI from './cookedAPI';
import favouriteAPI from './favouriteAPI';
import recipesAPI from './recipesAPI';
import toCookAPI from './toCookAPI';
import toBuyAPI from './toBuyAPI';
import usersAPI from './usersAPI';

const populateDB = async () => {
  // Remove all data from DB
  await recipesAPI.deleteAllRecipes();

  // Populate tables
  await addRecipes();
  await addCooked();
  await addToCook();
  await addFavourite();
  await addToBuy();
  await addComments();
};

const addRecipes = async () => {
  await recipesAPI.populateRecipes();

  const recipe = {
    title: 'Kebab',
    instructions:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia nibh sem, non tempor risus dignissim at. Vivamus ullamcorper, orci eu pretium rutrum, tortor justo pretium sem, ut rutrum ipsum magna nec justo. Vestibulum elit mi, vestibulum quis efficitur a, vulputate vel risus. Donec arcu lectus, aliquam scelerisque dictum eu, molestie et lectus. Praesent ultrices, sem non egestas porttitor, massa neque suscipit neque, at tempus nisl nisi ac ex. Praesent id nibh vehicula justo lacinia fringilla eget in diam. Duis in blandit elit, at dapibus mi. Phasellus ac congue nisi, rhoncus venenatis diam. Vivamus id ultricies elit. Pellentesque neque est, imperdiet id suscipit ut, mattis vel libero. Maecenas volutpat nunc at lacus lacinia, nec sollicitudin quam volutpat.',
    image:
      'https://i0.wp.com/blog.glovoapp.com/wp-content/uploads/2021/07/kebab-domicilio-madrid.png?resize=1080%2C675&ssl=1',
    ingredients: [
      'Lorem ipsum dolor',
      'sit amet, consectetur',
      'adipiscing elit. Vestibulum',
      'lacinia nibh sem, non',
      'tempor risus dignissim at.',
      'Vivamus ullamcorper,',
      'orci eu pretium rutrum',
    ],
  };

  const recipe2 = {
    title: 'Cheesecake',
    instructions:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia nibh sem, non tempor risus dignissim at. Vivamus ullamcorper, orci eu pretium rutrum, tortor justo pretium sem, ut rutrum ipsum magna nec justo. Vestibulum elit mi, vestibulum quis efficitur a, vulputate vel risus. Donec arcu lectus, aliquam scelerisque dictum eu, molestie et lectus. Praesent ultrices, sem non egestas porttitor, massa neque suscipit neque, at tempus nisl nisi ac ex. Praesent id nibh vehicula justo lacinia fringilla eget in diam. Duis in blandit elit, at dapibus mi. Phasellus ac congue nisi, rhoncus venenatis diam. Vivamus id ultricies elit. Pellentesque neque est, imperdiet id suscipit ut, mattis vel libero. Maecenas volutpat nunc at lacus lacinia, nec sollicitudin quam volutpat.',
    image:
      'https://www.wholesomeyum.com/wp-content/uploads/2017/03/wholesomeyum-Keto-Cheesecake-Recipe-Low-Carb-Sugar-Free-Cheesecake-500x375.jpg',
    ingredients: [
      'Lorem ipsum dolor',
      'sit amet, consectetur',
      'adipiscing elit. Vestibulum',
      'lacinia nibh sem, non',
      'tempor risus dignissim at.',
      'Vivamus ullamcorper,',
      'orci eu pretium rutrum',
    ],
  };

  const recipe3 = {
    title: 'Stuffed eggplant',
    instructions:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia nibh sem, non tempor risus dignissim at. Vivamus ullamcorper, orci eu pretium rutrum, tortor justo pretium sem, ut rutrum ipsum magna nec justo. Vestibulum elit mi, vestibulum quis efficitur a, vulputate vel risus. Donec arcu lectus, aliquam scelerisque dictum eu, molestie et lectus. Praesent ultrices, sem non egestas porttitor, massa neque suscipit neque, at tempus nisl nisi ac ex. Praesent id nibh vehicula justo lacinia fringilla eget in diam. Duis in blandit elit, at dapibus mi. Phasellus ac congue nisi, rhoncus venenatis diam. Vivamus id ultricies elit. Pellentesque neque est, imperdiet id suscipit ut, mattis vel libero. Maecenas volutpat nunc at lacus lacinia, nec sollicitudin quam volutpat.',
    image:
      'https://images-gmi-pmc.edge-generalmills.com/18d3d272-4cb4-4faf-b6c3-e037d48595f4.jpg',
    ingredients: [
      'Lorem ipsum dolor',
      'sit amet, consectetur',
      'adipiscing elit. Vestibulum',
      'lacinia nibh sem, non',
      'tempor risus dignissim at.',
      'Vivamus ullamcorper,',
      'orci eu pretium rutrum',
    ],
  };

  await recipesAPI.addRecipe(recipe);
  await recipesAPI.addRecipe(recipe2);
  await recipesAPI.addRecipe(recipe3);
};

const addCooked = async () => {
  const recipes = await recipesAPI.getAllRecipes();

  await cookedAPI.addCooked(recipes[0]._id, { like: 'LIKE' });
  await cookedAPI.addCooked(recipes[1]._id, { like: 'LIKE' });
  await cookedAPI.addCooked(recipes[2]._id, { like: 'DISLIKE' });
};

const addToCook = async () => {
  const recipes = await recipesAPI.getAllRecipes();

  await toCookAPI.addToCook(recipes[3]._id, { priority: 'HIGH' });
  await toCookAPI.addToCook(recipes[4]._id, { priority: 'MEDIUM' });
  await toCookAPI.addToCook(recipes[5]._id, { priority: 'LOW' });
};

const addFavourite = async () => {
  const recipes = await recipesAPI.getAllRecipes();

  await favouriteAPI.addFavourite(recipes[6]._id);
  await favouriteAPI.addFavourite(recipes[7]._id);
  await favouriteAPI.addFavourite(recipes[8]._id);
};

const addToBuy = async () => {
  await toBuyAPI.addToBuy({ ingredient: 'Chocolate', priority: 'HIGH' });
  await toBuyAPI.addToBuy({ ingredient: 'Cheese', priority: 'HIGH' });
  await toBuyAPI.addToBuy({ ingredient: 'Oil', priority: 'MEDIUM' });
  await toBuyAPI.addToBuy({ ingredient: 'Honey', priority: 'LOW' });
  await toBuyAPI.addToBuy({ ingredient: 'Bread', priority: 'MEDIUM' });
};

const addComments = async () => {
  var user = authenticated.getStorage('user');
  user = await usersAPI.getUserByUsername(JSON.parse(user).username);

  await recipesAPI.addComment(user.recipes[0]._id, {
    comment: 'This is a comment',
  });
  await recipesAPI.addComment(user.recipes[1]._id, {
    comment: 'This is a wild comment',
  });
  await recipesAPI.addComment(user.recipes[2]._id, {
    comment: 'This is another comment',
  });
};

export default populateDB;
