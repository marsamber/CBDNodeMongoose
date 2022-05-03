import { useEffect, useState } from 'react';
import { Alert, Container, Col, Row, ListGroup, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "./recipe.css";
import 'bootstrap/dist/css/bootstrap.css';
import recipesAPI from '../APIs/recipesAPI';
import isLogged from '../general/authenticated'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Recipe() {
    // if(!isLogged()) window.location.href = '/';
    const params = useParams();
    const recipeId = params.id;
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        recipesAPI.getRecipeById(recipeId)
            .then((recipe) => setRecipe(recipe));
    }, [recipeId]);

    function comment(event) {
        event.preventDefault();
    
        let commentt= event.target.elements.comment.value;
        
        const c = {
          comment: commentt,
        }
        recipesAPI.addComment(recipeId, c);
      }

    if (!recipe) return (
        <Container>
            <Row className="centertext main">
                <Col>
                    <Alert variant="warning">
                        <Alert.Heading> This recipe doesn't exist.</Alert.Heading>
                        <p>Choose an existing recipe.</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );

    console.log(recipe.comments)
    return (<Container>
        <Row className="centertext main">
            <Col>
                <h1>{recipe.title}</h1>
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <img src={'/images/'+recipe.image+'.jpg'} alt={recipe.image}/>
                </Row>
                <Row>
                    <Col>
                        <h2>Ingredients</h2>
                        <ListGroup variant="flush">
                            {recipe.ingredients.map((i) => {
                                return <ListGroup.Item>{i}</ListGroup.Item>
                            })}
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Instructions</h2>
                        {recipe.instructions}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Comments</h2>
                        {recipe.comments.map((c) => {
                            return <Alert variant="dark">
                                <Alert.Heading>{c.user.firstname} {c.user.lastname}</Alert.Heading>
                                <p>
                                    {c.comment}
                                </p>
                                <hr />
                                <p className="mb-0">
                                    {c.createdAt}
                                </p>
                            </Alert>
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={comment}>
                            <Form.Group className="mb-3" controlId="comment">
                                <Form.Label>New comment</Form.Label>
                                <Form.Control type="text" placeholder="Enter comment" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Col>

        </Row>
    </Container>);
}

export default Recipe;

// 625ee7e66f3c7485efa3d7d3