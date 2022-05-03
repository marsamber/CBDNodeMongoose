import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import usersAPI from "../APIs/usersAPI";

const SignUp = () => {

    const [user, setUser] = useState({
        firstname: null,
        lastname: null,
        email: null,
        username: null,
        password: null
    })

    const handleSubmit = async (event) => {
        await usersAPI.signUp(user);
        event.preventDefault();
    }

    return <Form className="signForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFirstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control type="text" placeholder="Enter Firstname" onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control type="text" placeholder="Enter lastname" onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUser({ ...user, username: e.target.value })} required={true} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required={true} />
        </Form.Group>
        <Button id="btnPag" type="submit">
            Submit
        </Button>
    </Form>
}

export default SignUp;