import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const SearchRecipes = () => {

    const [toSearch, setToSearch] = useState("");

    const handleSubmit = (e) => {
        window.location.href = `/recipes/search/${toSearch}?page=1`
        e.preventDefault();
    }

    return (<Form onSubmit={handleSubmit}>
        <InputGroup className="mt-3">
            <FormControl placeholder="Search by name or ingredient" onChange={(e) => setToSearch(e.target.value)} />
            <Button id='btnPag' type='submit'>
                Search
            </Button>
        </InputGroup></Form>)
}

export default SearchRecipes;