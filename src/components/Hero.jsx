import React from "react";
import { Link } from "react-router-dom"; // ១. កុំភ្លេច Import មួយនេះ
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h4 className="subtitle">NEW ARRIVALS 2026</h4>
        <h1 className="title">ស្វែងរកស្ទីលដែលជារបស់អ្នក</h1>
        <p className="description">
          បណ្តុំសម្លៀកបំពាក់ថ្មីបំផុតសម្រាប់រដូវកាលនេះ គុណភាពខ្ពស់ និងតម្លៃសមរម្យ។
        </p>
        
        {/* ២. ប្រើ Link រុំអត្ថបទដោយផ្ទាល់ ហើយឱ្យ Class ទៅ Link តែម្តង */}
        <Link to="/shop" className="hero-btn">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;