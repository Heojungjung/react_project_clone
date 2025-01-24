import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ShoppingCart from './pages/ShoppingCart';
import LogIn from './pages/LogIn';
import Store from './pages/Store';
import ProductDetailPage from './pages/ProductDetailPage';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext';

function App() {

  
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <ScrollToTop/>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} /> {/* 홈페이지 라우트 */}
            <Route path="/shopping-cart" element={<ShoppingCart />} /> {/* 쇼핑카트 라우트 */}
            <Route path="/store" element={<Store />} /> {/* 쇼핑카트 라우트 */}
            <Route path="/logIn" element={<LogIn />} /> {/* 로그인 라우트 */}
            <Route path="/productDetail" element={<ProductDetailPage />} /> {/* 로그인 라우트 */}
          </Routes>
      </div>
    </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;