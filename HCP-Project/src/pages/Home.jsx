import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ user, onLogout }) {
  const nav = useNavigate();

  const handleLogout = () => {
    onLogout();
    nav('/login');
  };

  return (
    <div className="home">
      <div className="home-card">
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <p style={{ margin: '0 10px 0 0', display: 'inline' }}>Welcome, {user?.email}!</p>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
        <h1>Smart Health Prediction System</h1>
        <p>Enter symptoms and get possible disease prediction</p>
        <button 
          onClick={() => nav("/symptoms")}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Start Health Check
        </button>
      </div>
    </div>
  );
}

export default Home;
