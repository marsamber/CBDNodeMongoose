import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import banner from '../../banner.png';
import '../../index.css'
import authenticated from "./authenticated";

const PrincipalNavbar = () => {
    const token = authenticated.getStorage("token")
    const username = authenticated.getStorage("username")
    const edit = () => { }
    const logout = async () => {
        authenticated.removeStorage("token")
        authenticated.removeStorage("username")
        window.location.href = "/";
    }
    if (token) {
        return (<Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/recipes?page=1"><img src={banner} alt="banner" height={50} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/recipes?page=1">Recipes</Nav.Link>
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/myRecipes" id='buttonNavbar'>&nbsp;Profile</NavDropdown.Item>
                            <NavDropdown.Item id='buttonNavbar'><button onClick={() => edit()}>Edit</button></NavDropdown.Item>
                            <NavDropdown.Item id='buttonNavbar'><button onClick={() => logout()}>Logout</button></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
    } else {
        return (<Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/recipes?page=1"><img src={banner} alt="banner" height={50} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/signIn">Sign In</Nav.Link>
                        <Nav.Link href="/signUp"><strong>Sign Up</strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
    }

}

export default PrincipalNavbar;