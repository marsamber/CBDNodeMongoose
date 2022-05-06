import { Container } from "react-bootstrap";
import authenticated from './authenticated';

const MenuProfile = () => {
    if (!authenticated.isLogged()) window.location.href = '/';

    return <Container>
        <br />
        <div className="d-flex justify-content-center">
            <badge className="badge" id="badgeProfile"><a href="/myRecipes">My Recipes</a></badge>&nbsp;
            <badge className="badge" id="badgeProfile"><a href="/favourites">Favourites</a></badge>&nbsp;
            <badge className="badge" id="badgeProfile"><a href="/cooked">Cooked</a></badge>&nbsp;
            <badge className="badge" id="badgeProfile"><a href="/toCook">To Cook</a></badge>
        </div>
    </Container>
}

export default MenuProfile;