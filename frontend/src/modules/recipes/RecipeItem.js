import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Card, Col } from "react-bootstrap";
import '../../index.css'

const RecipeItem = (props) => {
  var img = props.recipe.image === "#NAME?" ? "examplee" : props.recipe.image;
  var itemVal = null;
  var color = null;
  if (props.val === "Like") {
    itemVal = props.item.like;
    if (itemVal === "LIKE") color = "success";
    else if (itemVal === "DISLIKE") color = "danger";
  } else if (props.val === "Priority") {
    itemVal = props.item.priority;
    if (itemVal === "HIGH") color = "success";
    else if (itemVal === "MEDIUM") color = "warning"
    else if (itemVal === "LOW") color = "danger"
  }
  return <Col md={{ span: 3 }} id="aItem" className="mt-3">
    {props.delete && props.item ?<button className="btn" id="btnPag" style={{float:"right"}} onClick={()=>props.delete(props.item._id)}>
      <FontAwesomeIcon icon={faTrash} />
      </button>:<></>}
      {props.delete && !props.item && props.recipe ?<button className="btn" id="btnPag" style={{float:"right"}} onClick={()=>props.delete(props.recipe._id)}>
      <FontAwesomeIcon icon={faTrash} />
      </button>:<></>}
    <a id="aItem" href={'/recipe/' + props.recipe._id}><Card style={{ cursor: "pointer" }}>
    <Card.Img variant="top" src={'/images/' + img + '.jpg'} />
    <Card.Body>
      <Card.Title id="cardTitle">{props.recipe.title}</Card.Title>
      <Card.Text id="cardText">
        {props.recipe.instructions}
      </Card.Text>
      {itemVal !== null ? <><span>{props.val}</span>: <Badge bg={color}>{itemVal}</Badge></> : <></>}
    </Card.Body>
  </Card></a></Col>
}

export default RecipeItem;