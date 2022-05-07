import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import recipesAPI from "../APIs/recipesAPI";

const NewRecipe = (props) => {
  const [t, setT] = useState("");
  const [ins, setIns] = useState("");
  const [ing, setIng] = useState("");

  function enviar() {
    props.onHide();
    const r = {
      title: t,
      instructions: ins,
      ingredients: ing.split(","),
    };

    recipesAPI.addRecipe(r);
  }

  return (
    <Form>
      <Modal
        show={props.show}
        onHide={props.onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Recipe
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <ListGroup>
                  <ListGroup.Item>
                    Title:
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        onChange={(t) => setT(t.target.value)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Instructions:
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        onChange={(i) => setIns(i.target.value)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Ingredients (separated by ','):
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        onChange={(i) => setIng(i.target.value)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={() => enviar()}>
            Enviar
          </Button>
          <Button onClick={props.onHide}>Salir</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};
export default NewRecipe;
