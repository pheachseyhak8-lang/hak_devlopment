import React, { useState } from 'react';
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  // ១. ទាញយកទាំង cartItems និង clearCart
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: ""
  });

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("កន្ត្រករបស់អ្នកទទេស្អាត មិនអាចកុម្ម៉ង់បានទេ!");
      return;
    }
    
    console.log("Order Data:", { customer: formData, items: cartItems, total: subtotal });
    // alert("ការកុម្ម៉ង់របស់លោកអ្នកទទួលបានជោគជ័យ! យើងនឹងទាក់ទងទៅក្នុងពេលឆាប់ៗ។");
    
    // ២. ហៅ function clearCart() ដើម្បីសម្អាតកន្ត្រក
    clearCart();

    // ៣. ត្រឡប់ទៅទំព័រដើមវិញ
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Information</h3>
          <input 
            type="text" name="fullName" placeholder="Full Name" 
            required onChange={handleChange} 
          />
          <input 
            type="text" name="phone" placeholder="Phone Number" 
            required onChange={handleChange} 
          />
          <textarea 
            name="address" placeholder="Shipping Address" 
            required onChange={handleChange}
          ></textarea>
          <textarea 
            name="note" placeholder="Order Note (Optional)" 
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="place-order-btn">PLACE ORDER</button>
        </form>

        <div className="order-summary">
          <h3>Your Order</h3>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-total">
            <strong>Total:</strong>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;