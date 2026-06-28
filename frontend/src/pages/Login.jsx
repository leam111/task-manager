import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "1rem", color: "#4f46e5" }}>Login</h2>
      {error && <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>}
      <input type="email" placeholder="enter your email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="enter your password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={handleLogin}>Login</button>
       <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      
      
      
          </div>
  );
}

export default Login;
