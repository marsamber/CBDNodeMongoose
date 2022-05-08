import { Alert } from 'react-bootstrap';
import '../../index.css';
import usersAPI from '../APIs/usersAPI';
import authenticated from './authenticated';

const Populate = () => {
  if (authenticated.isLogged()) window.location.href = '/';

  const populateDB = async () => {
    // Remove users from DB
    await usersAPI.deleteAllUsers();

    // Populate user for operations with auth and internally we remove data and populate tables
    await usersAPI.signUp({ username: 'test', password: 'test' }, true);
  };

  return (
    <>
      <h1 className='title text-center'>Populate the DB!</h1>
      <Alert className='text-center alertDiv' variant='warning'>
        Before populating the database, you should know that this is an
        operation that will erase all existing data.
        <br /> This will also populate the database with test data along with a
        user with username and password "test". <br /> The operation may take a
        couple of minutes depending on the computer due to the massive load of
        recipes, and after it is done, you will be automatically logged in with
        the created user.{' '}
      </Alert>
      <div className='d-flex justify-content-center'>
        <button className='btn' id='btnPag' onClick={() => populateDB()}>
          <strong>POPULATE</strong>
        </button>
      </div>
    </>
  );
};
export default Populate;
