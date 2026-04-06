import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "../data/products"; // Import ទិន្នន័យរួម
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const found = allProducts.find(p => p.id === Number(id));
    if (found) setProduct(found);
  }, [id]);

  if (!product) return <div className="loading">កំពុងស្វែងរក...</div>;

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← ត្រឡប់ក្រោយ</button>
      <div className="detail-grid">
        <div className="product-image-section"><img src={product.image} alt={product.name} /></div>
        <div className="product-info-section">
          <p className="detail-category">{product.category}</p>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <div className="size-selector">
            <h4>Select Size:</h4>
            <div className="size-options">
              {["S", "M", "L", "XL"].map(s => (
                <button key={s} className={`size-btn ${selectedSize === s ? "active" : ""}`} onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={() => addToCart({...product, size: selectedSize})}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;