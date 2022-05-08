import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Card, Col } from "react-bootstrap";
import '../../index.css'

const ToBuyItem = (props) => {  var itemVal = null;
    var color = null;
  
    if(!props.item){return <></>}
    itemVal = props.item.priority;
    if (itemVal === "HIGH") color = "success";
    else if (itemVal === "MEDIUM") color = "warning"
    else if (itemVal === "LOW") color = "danger"
  
  return <Col md={{ span: 3 }} id="aItem" className="mt-3">
      <button className="btn" id="btnPag" style={{float:"right"}} onClick={()=>props.delete(props.item._id)}>
      <FontAwesomeIcon icon={faTrash} />
      </button>
<Card>
    <Card.Body>
      <Card.Title id="cardTitle">{props.item.ingredient}</Card.Title>
      {itemVal !== null ? <><span>{props.val}</span><Badge bg={color}>{itemVal}</Badge></> : <></>}
    </Card.Body>
  </Card></Col>
}

export default ToBuyItem;