import { Alert, Button, Container,  Row } from "react-bootstrap";
import '../../index.css'
import RecipeItem from "./RecipeItem";

const RecipesList = (props) => {

    const urlParams = new URLSearchParams(window.location.search);
    const pageStr = urlParams.get('page');
    const page = pageStr === null ? 1 : parseInt(pageStr);

    let totalCountPage = 20;
    let numPages;

    if(!props.recipes && !props.items) return <>Loading...</>

    let numRow;

    var recipes;
    if(props.recipes){
        recipes = props.recipes;
        numPages = Math.ceil(recipes.length / totalCountPage);

        recipes.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        recipes = recipes.slice(page * totalCountPage - totalCountPage, totalCountPage * page);

        numRow = Math.ceil(recipes.length / 4);
    }
    
    var items;
    if (props.items && props.val === "Like") {
        items = props.items;
        numPages = Math.ceil(items.length / totalCountPage);

        items.sort((a, b) => (a.like < b.like) ? 1 : ((b.like < a.like) ? -1 : (a.recipe.title > b.recipe.title) ? 1 : ((b.recipe.title > a.recipe.title) ? -1 : 0)))
        items = items.slice(page * totalCountPage - totalCountPage, totalCountPage * page);

        numRow = Math.ceil(items.length / 4);
    } else if (props.items && props.val === "Priority"){
        items = props.items;
        numPages = Math.ceil(items.length / totalCountPage);

        items.sort((a, b) => props.sortByPriority(a,b))
        items = items.slice(page * totalCountPage - totalCountPage, totalCountPage * page);

        numRow = Math.ceil(items.length / 4);
    }

    let i = -1;
    return <Container>
        {props.recipes && recipes.length === 0 ? <><br /><Alert className="text-center alertDiv" variant='warning'>
            No recipes found!
        </Alert></> : <></>}
        {props.items && items.length === 0 ? <><br /><Alert className="text-center alertDiv" variant='warning'>
            No recipes found!
        </Alert></> : <></>}
        {[...Array(numRow)].map((e, ind) => {
            return <Row key={ind} className="align-items-center">{[...Array(4)].map((el) => {
                i++;
                if (props.items && i < items.length && props.val)
                    return <RecipeItem recipe={items[i].recipe} key={items[i].recipe._id} item={items[i]} val={props.val} />
                if (props.recipes && i < recipes.length)
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