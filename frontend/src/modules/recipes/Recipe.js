import { useEffect, useState } from "react";
import {
  Alert,
  Container,
  Col,
  Row,
  ListGroup,
  Form,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./recipe.css";
import "bootstrap/dist/css/bootstrap.css";
import recipesAPI from "../APIs/recipesAPI";
import favouriteAPI from "../APIs/favouriteAPI";
import cookedAPI from "../APIs/cookedAPI";
import toCookAPI from "../APIs/toCookAPI";
import authenticated from "../general/authenticated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Recipe() {
  if (!authenticated.isLogged()) window.location.href = "/";

  const userId = JSON.parse(authenticated.getStorage("user"))._id

  const params = useParams();
  const recipeId = params.id;
  const [recipe, setRecipe] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const [favouriteId, setFavouriteId] = useState(null);
  const [toCook, setToCook] = useState(false);
  const [toCookId, setToCookId] = useState(null);
  const [cooked, setCooked] = useState(false);
  const [cookedId, setCookedId] = useState(null);
  
  useEffect(() => {
    recipesAPI.getRecipeById(recipeId).then((recipe) => setRecipe(recipe));
    favouriteAPI.getAllFavourites().then((list) => {
      for (let i = 0; i < list.length; i++) {
        let e = list[i].recipe._id === recipeId;
        if (e) {
          setFavourite(true);
          setFavouriteId(list[i]._id);
        }
      }
    });
    cookedAPI.getAllCooked().then((list) => {
      for (let i = 0; i < list.length; i++) {
        let e = list[i].recipe._id === recipeId;
        if (e) {
          setCooked(true);
          setCookedId(list[i]._id);
        }
      }
    });
    toCookAPI.getAllToCook().then((list) => {
      for (let i = 0; i < list.length; i++) {
        let e = list[i].recipe._id === recipeId;
        if (e) {
          setToCook(true);
          setToCookId(list[i]._id);
        }
      }
    });
  }, [recipe,recipeId]);

  function comment(event) {
    event.preventDefault();

    let commentt = event.target.elements.comment.value;

    const c = {
      comment: commentt,
    };
    recipesAPI.addComment(recipeId, c);
  }

  const popoverToCook = (
    <Popover id={"popover-positioned-top"}>
      <Popover.Header as="h3">Choose priority</Popover.Header>
      <Popover.Body>
        <Button
          variant="secondary"
          onClick={() => {
            let c = {
              priority: "LOW"
            };
            toCookAPI.addToCook(recipeId, c);
          }}
          disabled={toCook}
        >
          Low
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            let c = {
              priority: "MEDIUM"
            };
            toCookAPI.addToCook(recipeId, c);
          }}
          disabled={toCook}
        >
          Medium
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            let c = {
              priority: "HIGH"
            };
            toCookAPI.addToCook(recipeId, c);
          }}
          disabled={toCook}
        >
          High
        </Button>

      </Popover.Body>
    </Popover>
  );

  const popoverCooked = (
    <Popover id={"popover-positioned-top"}>
      <Popover.Header as="h3">Liked it?</Popover.Header>
      <Popover.Body>
        <Button
          variant="success"
          onClick={() => {
            let c = {
              like: "LIKE"
            };
            cookedAPI.addCooked(recipeId, c);
          }}
          disabled={toCook}
        >
          Like
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            let c = {
              like: "DISLIKE"
            };
            cookedAPI.addCooked(recipeId, c);
          }}
          disabled={toCook}
        >
          Dislike
        </Button>
      </Popover.Body>
    </Popover>
  );

  if (!recipe)
    return (
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

  return (
    <>
      <Row className="centertext main">
        <Col>
          <h1
            class="text-center title"
            style={{ fontSize: "300%", marginBottom: "40px" }}
          >
            {recipe.title}
          </h1>
        </Col>
      </Row>
      <Container style={{ maxWidth: "1000px" }}>
        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <img
              class="bordeimagen"
              src={recipe.image.includes(".") ? recipe.image:(recipe.image === "#NAME?" ? (`/images/examplee.jpg`):(`/images/${recipe.image}.jpg`))}
              alt={recipe.image}
              style={{ width: "100%" }}
            />
          </Col>
          <Col>
            <h2 class="text-center title" style={{ fontSize: "150%" }}>
              Ingredients
            </h2>
            <ListGroup variant="flush">
              {recipe.ingredients.map((i) => {
                return (
                  <ListGroup.Item
                    style={{ color: "white", backgroundColor: "transparent" }}
                  >
                    {i}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>

        <Row style={{ marginBottom: "20px" }}>
          <Col>
            <h2 class="text-center title">Instructions</h2>
            <p style={{ color: "white", backgroundColor: "transparent" }}>
              {recipe.instructions}
            </p>
          </Col>
          <Col>
            <h2 class="text-center title">Add to collections</h2>
            <Row>
              {favourite ? (
                <Button
                  variant="danger"
                  style={{ margin: "20px" }}
                  onClick={() => {
                    favouriteAPI.deleteFavourite(favouriteId);
                    document.location.reload();
                  }}
                >
                  Delete from Favourites
                </Button>
              ) : (
                <Button
                  variant="warning"
                  style={{ margin: "20px" }}
                  onClick={() => {
                    favouriteAPI.addFavourite(recipeId);
                  }}
                  disabled={favourite}
                >
                  Add to Favourites
                </Button>
              )}
              {toCook ? (
                <Button
                  variant="danger"
                  style={{ margin: "20px" }}
                  onClick={() => {
                    toCookAPI.deleteToCook(toCookId);
                    document.location.reload();
                  }}
                >
                  Delete from to Cook
                </Button>
              ) : (
                <OverlayTrigger trigger="click" placement="left" overlay={popoverToCook}>
                  <Button
                    variant="info"
                    style={{ margin: "20px" }}
                  >
                    Add to to Cook
                  </Button>
                </OverlayTrigger>
              )}

              {cooked ? (
                <Button
                  variant="danger"
                  style={{ margin: "20px" }}
                  onClick={() => {
                    cookedAPI.deleteCooked(cookedId);
                    document.location.reload();
                  }}
                >
                  Delete from Cooked
                </Button>
              ) : (
                <OverlayTrigger trigger="click" placement="left" overlay={popoverCooked}>
                  <Button
                    variant="success"
                    style={{ margin: "20px" }}
                  >
                    Add to Cooked
                  </Button>
                </OverlayTrigger>
              )}
            </Row>
            <Row></Row>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs lg="7">
            <h2 class="text-center title" style={{ fontSize: "150%" }}>
              Comments
            </h2>
            {recipe.comments.map((c) => {
              return (
                <Alert variant="dark">
                  <Alert.Heading>
                    <Row>
                      <Col>
                        {c.user.firstname} {c.user.lastname}
                      </Col>
                      <Col md="auto">
                        {c.user._id === userId ? <Button
                          variant="danger"
                          onClick={() => recipesAPI.deleteComment(c._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button> : <></>}

                      </Col>
                    </Row>
                  </Alert.Heading>
                  <p>{c.comment}</p>
                  <hr />
                  <p className="mb-0">{c.createdAt}</p>
                </Alert>
              );
            })}
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ paddingBottom: "40px" }}
        >
          <Col xs lg="7">
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
      </Container>
    </>
  );
}

export default Recipe;

// 625ee7e66f3c7485efa3d7d3
