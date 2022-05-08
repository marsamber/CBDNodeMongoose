import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import toBuyAPI from "../APIs/toBuyAPI";

const NewToBuy = (props) => {
  const [p, setP] = useState("HIGH");
  const [ing, setIng] = useState("");

  function enviar() {
    props.onHide();
    const r = {
      priority: p,
      ingredient: ing,
    };
    console.log(r)

    toBuyAPI.addToBuy(r);
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
                    Ingredient:
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        onChange={(i) => setIng(i.target.value)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Priority:
                    <Form.Group className="mb-3" controlId="categoria">
                      <Form.Select
                        onChange={(e) => {
                          setP(e.target.value);
                        }}
                      >
                        <option>HIGH</option>
                        <option>MEDIUM</option>
                        <option>LOW</option>
                      </Form.Select>
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={() => enviar()}>
            Send
          </Button>
          <Button onClick={props.onHide}>Salir</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};
export default NewToBuy;
