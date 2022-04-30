import { useEffect, useState } from 'react';
import { Alert, Container, Col, Row, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "./recipe.css";
import 'bootstrap/dist/css/bootstrap.css';
import recipesAPI from '../APIs/recipesAPI';
//import getImg from '../images/getImages'
import img from './ex.jpg'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Recipe() {
    const params = useParams();
    const recipeId = params.id;
    const [recipe, setRecipe] = useState({
        "title": 'Pan',
        "ingredients": ['Lavadura', 'Amor', 'Aceite', 'Harina'],
        "comments": ['Mu rico', 'Se me ha quemado bro'],
        "instructions": 'Amasalo todo y para el horno',
        "image": 'crispy-salt-and-pepper-potatoes-dan-kluger'
    });

    useEffect(() => {
        // recipesAPI.getRecipeById(recipeId)
        // .then((recipe)=>setRecipe(recipe));
    }, []);

    if (!recipe) return (
        <Container>
            <Row className="centertext main">
                <Col>
                    <Alert variant="warning">
                        <Alert.Heading> No existe esta receta.</Alert.Heading>
                        <p>Selecciona una receta existente.</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );


    return (<Container>
        <Row className="centertext main">
            <Col>
                <h1>{recipe.title}</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <img src={img} />
                    {/* <img src={getImg(recipe.image)} alt={recipe.image}/> */}
                </Row>
                <Row>
                    <Col>
                        <h2>Ingredientes</h2>
                        <ListGroup variant="flush">
                            {recipe.ingredients.map((i) => {
                                return <ListGroup.Item>{i}</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Intrucciones</h2>
                        {recipe.instructions}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Comentarios</h2>
                        {recipe.comments}
                    </Col>
                </Row>
            </Col>

        </Row>
    </Container>);
}

export default Recipe;