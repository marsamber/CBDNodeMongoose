import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import banner from '../../banner.png';
import '../../index.css'

const PrincipalNavbar = () => {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const edit = () =>{}
    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
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
                            <NavDropdown.Item href="#profile">&nbsp;Profile</NavDropdown.Item>
                            <NavDropdown.Item ><button className='buttonNavbar' onClick={() => edit()}>Edit</button></NavDropdown.Item>
                            <NavDropdown.Item ><button className='buttonNavbar' onClick={() => logout()}>Logout</button></NavDropdown.Item>
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