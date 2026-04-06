import React, { createContext, useState, useContext } from 'react';
import { useEffect } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ទាញទិន្នន័យពី LocalStorage មកប្រើជាតម្លៃដំបូងក្នុង useState តែម្ដង
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];  // refresh page មិនបាត់ទំនិញទេ
  });
// ២. ប្រើ useEffect ដើម្បីរក្សាទុកទិន្នន័យរាល់ពេលមានការប្រែប្រួល
  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      // បង្ខំឱ្យ ID ទៅជាលេខទាំងអស់ដើម្បីកុំឱ្យច្រឡំ
      const exist = prev.find((item) => Number(item.id) === Number(product.id));
      if (exist) {
        return prev.map((item) =>
          Number(item.id) === Number(product.id) ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
 
  

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const updateQty = (id, action) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (Number(item.id) === Number(id)) {
          const newQty = action === 'inc' ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };
  // ក្នុង CartProvider...
const clearCart = () => {
  setCartItems([]); // កំណត់ទៅជា Array ទទេវិញ
  localStorage.removeItem("cart"); // លុបចេញពី LocalStorage ដែរ
};

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);