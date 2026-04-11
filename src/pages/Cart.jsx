import React, { useState } from 'react';
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const [showQR, setShowQR] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const openBankApp = () => {
    // 💡 ដំណោះស្រាយ៖ ប្រើ Link ដែលអ្នក Copy ចេញពី ABA ដោយមិនបានដាក់តម្លៃលុយ (Amount = 0)
    // ពេល User ចុចទៅ វានឹងលោតចូល App ABA ហើយទុកប្រអប់លេខលុយឱ្យ User វាយខ្លួនឯង
    const abaLink = "https://pay.ababank.com/oRF8/ksgjomke";; 
    window.location.href = abaLink;
  };

  const sendOrderToTelegram = async () => {
    const botToken = "8214235068:AAHGIMjr6EkaBO2p_NaeCe9ztPos-laICRI"; 
    const chatId = "5467535945"; 

    let message = "🛍️ **មានការកុម្ម៉ង់ថ្មី!**\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });
    message += `\n💰 **សរុបរួមដែលត្រូវបង់: $${subtotal.toFixed(2)}**`;
    
    const user = JSON.parse(localStorage.getItem("user"));
    message += `\n👤 **អ្នកទិញ:** ${user ? user.email : "ភ្ញៀវមិនស្គាល់ឈ្មោះ"}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });

      if (response.ok) {
        alert("ការកុម្ម៉ង់ត្រូវបានផ្ញើជោគជ័យ!");
        setShowQR(false);
        clearCart(); 
      }
    } catch (error) {
      alert("Error sending message!");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>កន្ត្រកទំនិញរបស់អ្នកទទេស្អាត!</h2>
        <Link to="/shop" className="checkout-btn" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>ទៅទិញអីវ៉ាន់</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="item-qty">
                <button onClick={() => updateQty(item.id, 'dec')}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 'inc')}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>🗑️</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          <button onClick={() => setShowQR(true)} className="checkout-btn" style={{ width: '100%', marginTop: '20px' }}>PROCEED TO CHECKOUT</button>
        </div>
      </div>

      {showQR && (
        <div className="payment-modal">
          <div className="modal-content" style={{ padding: '30px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '10px' }}>បង់ប្រាក់រហ័ស</h2>
            
            <p style={{ marginBottom: '5px', fontSize: '18px' }}>ទឹកប្រាក់សរុប: <b style={{ color: '#d32f2f' }}>${subtotal.toFixed(2)}</b></p>
            <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>(សូមវាយបញ្ចូលចំនួនទឹកប្រាក់នេះ ពេលលោតចូល App ធនាគារ)</p>
            
            <button 
              onClick={openBankApp} 
              className="bank-app-btn" 
              style={{
                background: '#005aab',
                color: 'white',
                padding: '15px 25px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '20px'
              }}
            >
              🚀 បើកកម្មវិធី ABA ដើម្បីបង់ប្រាក់
            </button>
            
            <div className="modal-actions" style={{ display: 'flex', gap: '10px' }}>
              <button onClick={sendOrderToTelegram} className="confirm-btn" style={{ flex: 1, padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
                Confirm Order
              </button>
              <button onClick={() => setShowQR(false)} className="cancel-btn" style={{ flex: 1, padding: '12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;