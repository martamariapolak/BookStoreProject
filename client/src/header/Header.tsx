import { Link } from "react-router-dom";
import './Header.css';
import { useContext } from "react";
import { AccessTokenContext } from "../contexts/AccessTokenContext";

function Header() {
    const { hasToken, logout } = useContext(AccessTokenContext);
    return (
        <div className="header">
            {hasToken()
                &&
                <>
                    <Link to="/bookshelf" className="link-left">My Bookshelf</Link>
                    <button
                        type="button"
                        className="btn btn-primary mb-2"
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                    <Link to="/search" className="link-right">🔍 Search</Link>
                </>}
        </div>
    );
}

export default Header;