import { useLocation, useNavigate } from "react-router-dom";

function PredictionResult() {
  const location = useLocation();
  const nav = useNavigate();
  const { symptoms } = location.state || { symptoms: [] };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Prediction Result</h2>
      <p>Selected Symptoms:</p>
      {symptoms.length > 0 ? (
        <ul>
          {symptoms.map((s) => <li key={s}>{s}</li>)}
        </ul>
      ) : (
        <p>No symptoms selected.</p>
      )}

      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h3>Possible Disease: [ML Model Processing...]</h3>
        <p>This is where your backend results will appear.</p>
      </div>
      
      <button onClick={() => nav("/doctor")} style={{ marginTop: "10px" }}>
        See Recommended Doctors
      </button>
    </div>
  );
}

export default PredictionResult;