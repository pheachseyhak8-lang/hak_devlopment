import React from "react";
import { Link } from "react-router-dom";
import { allProducts } from "../data/products"; // Import ទិន្នន័យរួម
import { useCart } from "../context/CartContext";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const featured = allProducts.slice(0, 13); // បង្ហាញតែ ៤ មុខដំបូង

  return (
    <section className="featured-section">
      <h2 className="section-title">💫Featured Products</h2>
      <div className="product-grid">
        {featured.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
              <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
            <div className="product-info">
              <p className="category">{product.category}</p>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4>{product.name}</h4>
              </Link>
              <p className="price">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default FeaturedProducts;