import { Link } from "react-router-dom"
import "../styles/sidebar.css";

function Sidebar(){
    return (
        <div className="sidebar">
            <h2 className="logo"> Health AI</h2>

            <nav>
                    <Link to="/">🏠 Dashboard</Link>
                    <Link to="/symptoms">🤒 Symptoms</Link>
                    <Link to="/prediction">📊 Prediction</Link>
                    <Link to="/doctors">👨‍⚕️ Doctors</Link>
                    <Link to="/chatbot">💬 Chatbot</Link>
            </nav>
        </div>
    );
}
export default Sidebar;