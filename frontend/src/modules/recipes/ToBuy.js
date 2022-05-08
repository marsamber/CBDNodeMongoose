import { useEffect, useState } from "react";
import MenuProfile from "../general/MenuProfile";
import ToBuyList from "./ToBuyList";
import "../../index.css";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import authenticated from "../general/authenticated";
import NewToBuy from "./NewToBuy";
import toBuyAPI from "../APIs/toBuyAPI";

const ToBuy = () => {
  if (!authenticated.isLogged()) window.location.href = "/";

  const [modal, setModal] = useState(0);
    const [buys, setBuys] = useState([]);
    useEffect(() => {
      toBuyAPI.getAllToBuy().then((b)=>(setBuys(b)));
    }, [buys])

    const deleteToBuy = async(id) => {
        await toBuyAPI.deleteToBuy(id);
    }

  return (
    <>
      <MenuProfile />
      <br />
      <h1 className="title text-center">To Buy</h1>
      <Container>
        <Button
          id="btnPag"
          style={{ float: "right" }}
          onClick={() => setModal(1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Container>
      <br/><br/>
      <ToBuyList items={buys} delete = {deleteToBuy} />
      <NewToBuy show={modal} onHide={() => setModal(0)} />
    </>
  );
};

export default ToBuy;
