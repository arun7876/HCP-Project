import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ user, onLogout }) {
  const nav = useNavigate();

  const handleLogout = () => {
    onLogout();
    nav("/login");
  };

  return (
    <div className="home">
      <div className="home-card">

        <div className="top-bar">
          <p>Welcome, {user?.email}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <h1>Smart Health Prediction System</h1>
        <p className="subtitle">AI-powered disease prediction & doctor recommendation</p>

        <button className="start-btn" onClick={() => nav("/symptoms")}>
          Start Health Check
        </button>

      </div>
    </div>
  );
}

export default Home;
