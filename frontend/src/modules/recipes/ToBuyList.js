import { Alert, Button, Container, Row } from "react-bootstrap";
import "../../index.css";
import ToBuyItem from "./ToBuyItem";

const RecipesList = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const pageStr = urlParams.get("page");
  const page = pageStr === null ? 1 : parseInt(pageStr);

  let totalCountPage = 20;
  let numPages;

  const sortByPriority = (a,b) => {
    if (a.priority === "HIGH") {
        if (b.priority === "HIGH") {
            return (a.ingredient > b.ingredient) ? 1 : ((b.ingredient > a.ingredient) ? -1 : 0);
        } else {
            return -1;
        }
    } else if (b.priority === "HIGH") {
        return 1;
    } else if (a.priority === "LOW") {
        if (b.priority === "LOW") {
            return (a.ingredient > b.ingredient) ? 1 : ((b.ingredient > a.ingredient) ? -1 : 0);
        } else {
            return 1;
        }
    } else if (b.priority === "LOW") {
        return -1;
    } else {
        return (a.ingredient > b.ingredient) ? 1 : ((b.ingredient > a.ingredient) ? -1 : 0);
    }
}

  if (!props.recipes && !props.items) return <>Loading...</>;

  let numRow;

  var items;

  items = props.items;
  numPages = Math.ceil(items.length / totalCountPage);

  items.sort((a, b) => sortByPriority(a, b));
  items = items.slice(
    page * totalCountPage - totalCountPage,
    totalCountPage * page
  );

  numRow = Math.ceil(items.length / 4);

  let i = -1;
  return (
    <Container>
      {props.items && items.length === 0 ? (
        <>
          <br />
          <Alert className="text-center alertDiv" variant="warning">
            No recipes found!
          </Alert>
        </>
      ) : (
        <></>
      )}
      {[...Array(numRow)].map((e, ind) => {
        return (
          <Row key={ind} className="align-items-center">
            {[...Array(4)].map((el) => {
              i++;
              return (
                <ToBuyItem
                  item={items[i]}
                  val={props.val}
                  delete={props.delete}
                />
              );
            })}
          </Row>
        );
      })}
      <br />
      <div className="d-flex justify-content-center">
        <Button id="btnPag" href={window.location.pathname + "?page=" + 1}>
          First
        </Button>
        &nbsp;
        <Button
          id="btnPag"
          href={window.location.pathname + "?page=" + (page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        &nbsp;
        <Button
          id="btnPagAct"
          href={window.location.pathname + "?page=" + page}
        >
          {page}
        </Button>
        &nbsp;
        <Button
          id="btnPag"
          href={window.location.pathname + "?page=" + (page + 1)}
          disabled={page + 1 > numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          id="btnPag"
          href={window.location.pathname + "?page=" + numPages}
        >
          Last
        </Button>
      </div>
    </Container>
  );
};

export default RecipesList;
