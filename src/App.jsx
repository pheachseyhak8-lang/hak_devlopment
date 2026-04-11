import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login  from "./pages/Login.jsx";
import Register  from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Review from "./components/ReviewSystem.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // បង្កើត State ស្វែងរក
  return (
    <CartProvider>
      <Navbar setSearchQuery={setSearchQuery}/>
      <Routes>
        <Route path="/" element={<><Hero /><FeaturedProducts /></>} />
        <Route path="/shop" element={<Shop searchQuery={searchQuery}/>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* 🔒 ការពារទំព័រ Cart: ចុចចូលបានលុះត្រាតែ Login រួច */}
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
         }
       />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;