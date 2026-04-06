import React from 'react';
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();

  // គណនាតម្លៃសរុប
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const sendOrderToTelegram = async () => {
    // ⚠️ កុំភ្លេចប្តូរ Token និង ID ពិតប្រាកដរបស់អ្នក
    const botToken = "8214235068:AAHGIMjr6EkaBO2p_NaeCe9ztPos-laICRI"; 
    const chatId = "5467535945"; 

    // ១. រៀបចំសារ (Message)
    let message = "🛍️ **មានការកុម្ម៉ង់ថ្មី!**\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (Size: ${item.size || 'M'}) x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    });
    
    // កែពី totalPrice មកជា subtotal វិញឱ្យត្រូវជាមួយ variable ខាងលើ
    message += `\n💰 **សរុបរួម: $${subtotal.toFixed(2)}**`;
    
    // ទាញយក Email អ្នកទិញពី LocalStorage
    const user = JSON.parse(localStorage.getItem("user"));
    message += `\n👤 **អ្នកទិញ:** ${user ? user.email : "ភ្ញៀវមិនស្គាល់ឈ្មោះ"}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      if (response.ok) {
        alert("ការកុម្ម៉ង់ត្រូវបានផ្ញើទៅកាន់ហាងជោគជ័យ! យើងនឹងទាក់ទងទៅអ្នកក្នុងពេលឆាប់ៗ។");
        clearCart(); // លុបអីវ៉ាន់ក្នុងកន្ត្រកចេញក្រោយកុម្ម៉ង់រួច
      } else {
        alert("ការផ្ញើមានបញ្ហា សូមពិនិត្យ Bot Token ឬ Chat ID!");
      }
    } catch (error) {
      alert("មិនអាចភ្ជាប់ទៅកាន់ Telegram បានទេ!");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>កន្ត្រកទំនិញរបស់អ្នកទទេស្អាត!</h2>
        <p style={{ margin: '15px 0', color: '#666' }}>សូមទៅកាន់ទំព័រហាងដើម្បីរើសទំនិញដែលអ្នកចូលចិត្ត។</p>
        <Link to="/shop" className="checkout-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
          ទៅទិញអីវ៉ាន់ឥឡូវនេះ
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Your Shopping Cart</h1>
        <button onClick={clearCart} className="clear-cart-btn" style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>
          Clear All Items 🗑️
        </button>
      </div>
      
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="item-qty">
                <button onClick={() => updateQty(item.id, 'dec')} className="qty-btn">-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 'inc')} className="qty-btn">+</button>
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {/* ប្តូរពី Link ទៅជា Button ដើម្បីហៅ function ផ្ញើទៅ Telegram */}
          <button onClick={sendOrderToTelegram} className="checkout-btn" style={{ width: '100%', marginTop: '20px', cursor: 'pointer' }}> 
            PROCEED TO CHECKOUT (TELEGRAM)
          </button>
        </div>
      </div>
    </div>
  );
};

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQty, clearCart } = useCart();

//   const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

//   if (cartItems.length === 0) {
//     return (
//       <div className="cart-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
//         <h2>កន្ត្រកទំនិញរបស់អ្នកទទេស្អាត!</h2>
//         <p style={{ margin: '15px 0', color: '#666' }}>សូមទៅកាន់ទំព័រហាងដើម្បីរើសទំនិញដែលអ្នកចូលចិត្ត។</p>
//         <Link to="/shop" className="checkout-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
//           ទៅទិញអីវ៉ាន់ឥឡូវនេះ
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <div className="cart-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <h1>Your Shopping Cart</h1>
//         {/* ដាក់ប៊ូតុង Clear All នៅទីនេះ ឱ្យវានៅខាងលើបញ្ជីទំនិញ */}
//         <button onClick={clearCart} className="clear-cart-btn" style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}>
//           Clear All Items 🗑️
//         </button>
//       </div>
      
//       <div className="cart-layout">
//         <div className="cart-items">
//           {cartItems.map(item => (
//             <div key={item.id} className="cart-item">
//               <img src={item.image} alt={item.name} />
//               <div className="item-details">
//                 <h3>{item.name}</h3>
//                 <p className="item-price">${item.price.toFixed(2)}</p>
//               </div>

//               <div className="item-qty">
//                 <button onClick={() => updateQty(item.id, 'dec')} className="qty-btn">-</button>
//                 <span>{item.qty}</span>
//                 <button onClick={() => updateQty(item.id, 'inc')} className="qty-btn">+</button>
//               </div>

//               {/* ប៊ូតុងលុបទំនិញនីមួយៗ (ម្នាក់ឯង) */}
//               <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
//                  🗑️
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="cart-summary">
//           <h3>Order Summary</h3>
//           <div className="summary-row">
//             <span>Subtotal</span>
//             <span>${subtotal.toFixed(2)}</span>
//           </div>
//           <div className="summary-row">
//             <span>Shipping</span>
//             <span>Free</span>
//           </div>
//           <hr />
//           <div className="summary-row total">
//             <span>Total</span>
//             <span>${subtotal.toFixed(2)}</span>
//           </div>
//           <Link to="/checkout" className="checkout-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}> 
//             PROCEED TO CHECKOUT
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Cart;