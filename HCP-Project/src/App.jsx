import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "./firebase";
import Login from "./pages/login";
import Register from "./Components/Register";
import Home from "./pages/Home";
import SymptomSelection from "./pages/SymptomSelection";
import PredictionResult from "./pages/PredictionResult";
import Chatbot from "./pages/Chatbot";
import DoctorRecommendation from "./pages/DoctorRecommendation";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Current Firebase user from App.js:", currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading authentication...</div>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out!");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <Routes>
      {/* Public Routes - Available without login */}
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
      <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />

      {/* Protected Routes - Only available after login */}
      <Route 
        path="/home" 
        element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/symptoms" 
        element={user ? <SymptomSelection /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/result" 
        element={user ? <PredictionResult /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/chatbot" 
        element={user ? <Chatbot /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/doctor" 
        element={user ? <DoctorRecommendation /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

export default App;