import React, { useState } from 'react';
import { allProducts } from "../data/products"; // Import ទិន្នន័យរួម
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Shop.css";

const Shop = ({ searchQuery }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState("Newest");

  let filteredProducts = allProducts.filter(product => {
    const isCategoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const isSearchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });

  if (sortType === "LowToHigh") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortType === "HighToLow") filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="shop-page">
      <aside className="sidebar">
        <h3>Filters</h3>
        <h3>Category</h3>
        <div className="filter-group">
          {["All", "Men", "Women", "Kids"].map(cat => (
            <label key={cat}>
              <input type="radio" name="cat" checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} /> {cat}
            </label>
          ))}
        </div>
      </aside>

      <main className="shop-content">
        <div className="shop-header">
          <h2>{selectedCategory} Products</h2>
          <select className="sort-select" onChange={(e) => setSortType(e.target.value)}>
            <option value="Newest">Newest</option>
            <option value="LowToHigh">Price: Low to High</option>
            <option value="HighToLow">Price: High to Low</option>
          </select>
        </div>
        
        <div className="products-grid">
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link>
              <h4>{product.name}</h4>
              <p>${product.price}</p>
              <button className="add-to-cart-btn-small" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          )) : <p>រកមិនឃើញទំនិញឈ្មោះ "{searchQuery}" ទេ!</p>}
        </div>
      </main>
    </div>
  );
};
export default Shop;