import "../styles/topbar.css";

function Topbar({ user }) {
  return (
    <div className="topbar">
      <h3>Smart Health Prediction System</h3>
      <p>{user?.email}</p>
    </div>
  );
}

export default Topbar;
