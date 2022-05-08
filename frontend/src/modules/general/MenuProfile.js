import { Container } from "react-bootstrap";
import authenticated from './authenticated';

const MenuProfile = () => {
    if (!authenticated.isLogged()) window.location.href = '/';

    return <Container>
        <br />
        <div className="d-flex justify-content-center">
            <span className="badge" id="badgeProfile"><a href="/myRecipes">My Recipes</a></span>&nbsp;
            <span className="badge" id="badgeProfile"><a href="/favourites">Favourites</a></span>&nbsp;
            <span className="badge" id="badgeProfile"><a href="/cooked">Cooked</a></span>&nbsp;
            <span className="badge" id="badgeProfile"><a href="/toCook">To Cook</a></span>&nbsp;
            <span className="badge" id="badgeProfile"><a href="/toBuy">To Buy</a></span>
        </div>
    </Container>
}

export default MenuProfile;