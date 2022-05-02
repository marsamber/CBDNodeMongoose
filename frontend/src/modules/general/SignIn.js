import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import '../../index.css'
import usersAPI from "../APIs/usersAPI";

const SignIn = () => {

    const [user, setUser] = useState({
        username: null,
        password: null
    });

    const handleSubmit = async (event) => {
        await usersAPI.signIn(user);
        event.preventDefault();
    }

    return (<Form className="signForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </Form.Group>
        <Button variant="secondary" type="submit">
            Submit
        </Button>
    </Form>)
}

export default SignIn;