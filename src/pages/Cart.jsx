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
    setIsProcessing(true); // បង្ហាញផ្ទាំងបញ្ជាក់បន្ទាប់ពីលោតទៅ ABA
  };

  // ២. មុខងារផ្ញើទៅ Telegram និងសម្អាតកន្ត្រក
  const handleFinalConfirm = async () => {
    const botToken = "8214235068:AAHGIMjr6EkaBO2p_NaeCe9ztPos-laICRI"; 
    const chatId = "5467535945"; 

    let message = "✅ **ការទូទាត់ត្រូវបានបញ្ជាក់ដោយអតិថិជន!**\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });
    message += `\n💰 **សរុបដែលត្រូវបង់: $${subtotal.toFixed(2)}**`;
    
    const user = JSON.parse(localStorage.getItem("user"));
    message += `\n👤 **អ្នកទិញ:** ${user ? user.email : "ភ្ញៀវមិនស្គាល់ឈ្មោះ"}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });

      if (response.ok) {
        alert("អរគុណសម្រាប់ការបញ្ជាទិញ! យើងនឹងពិនិត្យវិក្កយបត្ររបស់អ្នកក្នុងពេលឆាប់ៗ។");
        clearCart(); 
        setIsProcessing(false);
      }
    } catch (error) {
      alert("មានបញ្ហាក្នុងការបញ្ជាក់ការកុម្ម៉ង់!");
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
          
          <button onClick={openBankApp} className="checkout-btn" style={{ width: '100%', marginTop: '20px', background: '#005aab' }}>
            Payment with ABA Bank
          </button>
        </div>
      </div>

      {/* ផ្ទាំង Modal បញ្ជាក់ការបង់ប្រាក់ (លោតឡើងបន្ទាប់ពីចុចប៊ូតុងខាងលើ) */}
      {isProcessing && (
        <div className="payment-modal">
          <div className="modal-content payment-confirm-content">
            <div className="modal-header-success">
              <div className="success-icon-wrap">
                <span className="success-icon">✅</span>
              </div>
              <h2>ជំហានចុងក្រោយ!</h2>
            </div>
            
            <div className="modal-body-confirm">
              <p className="confirm-instruction">
                តើអ្នកបានផ្ទេរប្រាក់ចំនួន <b className="total-amount">${subtotal.toFixed(2)}</b> ក្នុងកម្មវិធី ABA រួចរាល់ហើយមែនទេ?
              </p>
              <p className="note-text">(ចុចប៊ូតុងខាងក្រោមដើម្បីបញ្ចប់ការកុម្ម៉ង់)</p>
            </div>
            
            <div className="modal-actions-vertical">
              <button onClick={handleFinalConfirm} className="confirm-paid-btn">
                YES, I HAVE PAID
              </button>
              <button onClick={() => setIsProcessing(false)} className="cancel-confirm-btn">
                មិនទាន់បានបង់ / ត្រឡប់ក្រោយ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;