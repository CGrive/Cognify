import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing">
            <div className="landing-content">
                <h1>Welcome to Cognify</h1>
                <p>
                    Your intelligent research companion — Summarize, analyze, validate, and share your research with ease.
                </p>
                <div className="cta-buttons">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="secondary-btn">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
