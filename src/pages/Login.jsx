import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ១. ទាញយកទិន្នន័យដែលបានចុះឈ្មោះទុកក្នុង localStorage
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    // ២. ឆែកមើលថាជា Admin ឬជា User ដែលបានចុះឈ្មោះ
    if (email === "pheachseyhak@gmail.com" && password === "123456") {
      // ករណីជា Admin
      alert("ស្វាគមន៍ Admin!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      navigate("/");
    } 
    else if (storedUser && email === storedUser.email && password === storedUser.password) {
      // ករណីជា User ធម្មតាដែលបាន Register រួច
      alert(`ស្វាគមន៍ត្រឡប់មកវិញ ${storedUser.username}!`);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(storedUser));
      navigate("/");
    } 
    else {
      // ករណីខុសទាំងពីរ
      alert("អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវទេ!");
    }
  };
   
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">LOGIN</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;