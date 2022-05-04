import { Card, Col } from "react-bootstrap";
import '../../index.css'

const RecipeItem = (props) => {
  var img = props.recipe.image === "#NAME?" ? "examplee" : props.recipe.image;
  var itemVal = null;
  if (props.val === "like") {
    itemVal = props.item.like;
  } else if (props.val === "priority") {
    itemVal = props.item.priority;
  }
  return <Col md={{ span: 3 }} id="aItem" className="mt-3"><a id="aItem" href={'/recipe/' + props.recipe._id}><Card style={{ cursor: "pointer" }}>
    <Card.Img variant="top" src={'/images/' + img + '.jpg'} />
    <Card.Body>
      <Card.Title id="cardTitle">{itemVal !== null ? `${itemVal} - ${props.recipe.title}` : props.recipe.title}</Card.Title>
      <Card.Text id="cardText">
        {props.recipe.instructions}
      </Card.Text>
    </Card.Body>
  </Card></a></Col>
}

export default RecipeItem;