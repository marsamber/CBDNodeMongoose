import { Button, Card, Col } from "react-bootstrap";
import '../../index.css'

const RecipeItem = (props) =>{
    var img = props.recipe.image === "#NAME?" ? "example" : props.recipe.image;
    return <Col md={{span:3}} className="mt-3"><Card >
    <Card.Img variant="top" src={'/images/'+img+'.jpg'} />
    <Card.Body>
      <Card.Title id="cardTitle">{props.recipe.title}</Card.Title>
      <Card.Text>
        {props.recipe.instructions.substring(0,100)}...
      </Card.Text>
      <Button id="btnPag" href={'/recipe/'+props.recipe._id}>I want to cook it!</Button>
    </Card.Body>
  </Card></Col>
}

export default RecipeItem;