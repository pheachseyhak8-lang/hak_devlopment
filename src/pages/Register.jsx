import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css"; // ប្រើ CSS រួមគ្នាជាមួយ Login ក៏បានដើម្បីកុំឱ្យពិបាកថែម File ច្រើន

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("លេខសម្ងាត់មិនស៊ីគ្នាទេ!");
      return;
    }

    // រក្សាទុកទិន្នន័យអ្នកប្រើប្រាស់ក្នុង localStorage (សាកល្បង)
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    };
    
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    alert("ចុះឈ្មោះជោគជ័យ! សូមចូល Login។");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="username" placeholder="Your Name" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
          </div>
          <button type="submit" className="login-btn">REGISTER NOW</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;