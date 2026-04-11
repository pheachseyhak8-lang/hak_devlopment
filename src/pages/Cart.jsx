import React, { useState } from 'react';
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  // ១. មុខងារបើក App ABA
  const openBankApp = () => {
    const abaLink = "https://pay.ababank.com/oRF8/ksgjomke";
    window.location.href = abaLink;
    setIsProcessing(true); // បង្ហាញប៊ូតុង Confirm បន្ទាប់ពីលោតទៅ ABA
  };

  // ២. មុខងារបញ្ជាក់ថាបង់រួច ទើបផ្ញើទៅ Telegram និង Clear Cart
  const handleFinalConfirm = async () => {
    const botToken = "8214235068:AAHGIMjr6EkaBO2p_NaeCe9ztPos-laICRI"; 
    const chatId = "5467535945"; 

    let message = "✅ **ការទូទាត់ត្រូវបានបញ្ជាក់ដោយអតិថិជន!**\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });
    message += `\n💰 **សរុប: $${subtotal.toFixed(2)}**`;
    
    const user = JSON.parse(localStorage.getItem("user"));
    message += `\n👤 **អ្នកទិញ:** ${user ? user.email : "ភ្ញៀវមិនស្គាល់ឈ្មោះ"}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });

      if (response.ok) {
        alert("អរគុណសម្រាប់ការបញ្ជាទិញ! យើងនឹងពិនិត្យវិក្កយបត្ររបស់អ្នក។");
        clearCart(); 
        setIsProcessing(false);
      }
    } catch (error) {
      alert("Error sending confirmation!");
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
          
          {!isProcessing ? (
            // ជំហានទី ១: ចុចដើម្បីទៅ ABA
            <button onClick={openBankApp} className="checkout-btn" style={{ width: '100%', marginTop: '20px', background: '#005aab' }}>
              Payment with ABA Bank
            </button>
          ) : (
            // ជំហានទី ២: បន្ទាប់ពីត្រលប់ពី ABA វិញ ឱ្យគេចុចបញ្ជាក់
            <div style={{ marginTop: '20px', padding: '15px', border: '1px dashed #005aab', borderRadius: '10px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>តើអ្នកបានបង់ប្រាក់រួចរាល់ហើយមែនទេ?</p>
              <button onClick={handleFinalConfirm} className="checkout-btn" style={{ width: '100%', background: '#28a745' }}>
                YES, I HAVE PAID
              </button>
              <button onClick={() => setIsProcessing(false)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;