import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SymptomSelection() {
    const [symptoms, setSymptoms] = useState([]);
    const nav = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setSymptoms(prev =>
            prev.includes(value)
            ? prev.filter(s => s !== value)
            : [...prev, value]
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Select your Symptoms</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label>
                    <input type="checkbox" value="Fever" onChange={handleChange} /> Fever
                </label>
                <label>
                    <input type="checkbox" value="Cough" onChange={handleChange} /> Cough
                </label>
                <label>
                    <input type="checkbox" value="Headache" onChange={handleChange} /> Headache
                </label>
            </div>
            <br />
            <button onClick={() => nav("/result", { state: { symptoms } })}>
                Predict Now
            </button>
        </div>
    );
}

export default SymptomSelection;