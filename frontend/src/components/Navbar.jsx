import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <h1 className="logo">Cognify</h1>
                <ul className="nav-links">
                    <li><Link to="/Cognify/">Home</Link></li>
                    <li><Link to="Cognify/login">Login</Link></li>
                    <li><Link to="Cognify/register">Register</Link></li>
                    <li><Link to="Cognify/dashboard">Dashboard</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
