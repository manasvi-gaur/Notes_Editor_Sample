// Login.tsx
import React, { useState } from "react";
import "./Login.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    const res = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await res.json()
    if(resJson.status == 'ok'){
        window.localStorage.setItem('id', resJson.id)
        navigate('/notes')
    }else{
        alert(resJson.message)
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
