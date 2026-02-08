// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!", userCredential.user);
      // Navigate to home after successful login
      navigate('/home');
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '30px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
          style={{ 
            width: '100%', 
            padding: '10px', 
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: loading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Register here</Link>
      </p>
    </div>
  );
}

export default Login;
