import { useState } from "react";
import { Alert, Button, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import '../../index.css'
import RecipeItem from "./RecipeItem";

const RecipesList = (props) => {

    const [toSearch, setToSearch] = useState("");

    const urlParams = new URLSearchParams(window.location.search);
    const pageStr = urlParams.get('page');
    const page = pageStr === undefined ? 1 : parseInt(pageStr);

    if (!props.recipes) return <>Loading...</>

    let totalCountPage = 40;
    var recipes = props.recipes;
    let numPages = Math.ceil(recipes.length / 40);

    recipes.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    recipes = recipes.slice(page * totalCountPage - 40, totalCountPage * page);

    let numRow = recipes.length / 4;
    numRow = Math.round(numRow) + 1;
    let i = -1;
    return <Container>
        <InputGroup className="mt-3">
            <FormControl placeholder="Search by name or ingredient" onChange={(e) => setToSearch(e.target.value)} />
            <Button id='btnPag' onClick={() => window.location.href = `/recipes/search/${toSearch}?page=1`}>
                Search
            </Button>
        </InputGroup>
        {recipes.length === 0 ? <><br /><Alert className="text-center alertDiv" variant='warning'>
            No recipes found!
        </Alert></> : <></>}
        {[...Array(numRow)].map((e, ind) => {
            return <Row key={ind} className="align-items-center">{[...Array(4)].map((el) => {
                i++;
                if (i < recipes.length)
                    return <RecipeItem recipe={recipes[i]} key={recipes[i]._id} />
                return <></>
            })}</Row>
        })}
        <br />
        <div className="d-flex justify-content-center">
            <Button id="btnPag" href={window.location.pathname + '?page=' + 1}>First</Button>&nbsp;
            <Button id="btnPag" href={window.location.pathname + '?page=' + (page - 1)} disabled={page === 1}>Prev</Button>&nbsp;
            <Button id="btnPagAct" href={window.location.pathname + '?page=' + page}>{page}</Button>&nbsp;
            <Button id="btnPag" href={window.location.pathname + '?page=' + (page + 1)} disabled={(page + 1) > numPages}>Next</Button>&nbsp;
            <Button id="btnPag" href={window.location.pathname + '?page=' + numPages}>Last</Button>
        </div>
    </Container>
}

export default RecipesList;