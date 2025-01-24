import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import '../../styles/common/Header.css';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { userId, setUserId } = useContext(AuthContext); // 로그인 상태를 가져옴
  const [isActive, setIsActive] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    chicken: false,
    granola: false,
  });

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const [cartCount, setCartCount] = useState(0); 

  const handleLogout = () => {
    setUserId(null); 
    alert("로그아웃 되었습니다.");
  };
  const categories = [
    { id: 'chicken', name: '닭가슴살', items: ['닭가슴살1', '닭가슴살2'] },
    { id: 'granola', name: '그래놀라', items: ['그래놀라1', '그래놀라2'] },
    { id: 'desert', name: '디저트', items: ['디저트1', '디저트2'] },
    { id: 'fastmeal', name: '간편한끼', items: ['간편한끼1', '간편한끼2'] }
  ];

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...existingCart, item];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartCount(updatedCart.length); 
  };


  return (
    <div className="header">
      <div className="header-wrap">
        <section className="header-top">
          <div className="header-left">
            <div className="hamburger-menu" onClick={handleClick}>
              <img src="/assets/images/hamburger.png" alt="hamburger" />
            </div>
          </div>
          <h1 className="top-logo">
            <Link to="/">
              <img src="/assets/images/Logo(Yellow).png" alt="logo" />
            </Link>
          </h1>
          <div className="header-right">
            <div className="shoppingcart">
              <Link to="/shopping-cart">
                <img src="/assets/images/top_cart_btn_w.png" alt="cart" />
                <div className="cart-num">{cartCount > 0 ? cartCount : ''}</div>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div className='hamburgerMenu'>
        <div className={`hamburgerMenu-wrap ${isActive ? 'active' : ''}`}>
          <div className="side-top">
          <ul>
            {userId ? (
              <>
                <li onClick={handleLogout}>
                 <Link>로그아웃</Link> 
                 </li>
                <li>
                  <Link to="/mypage">마이페이지</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/logIn">로그인</Link>
                </li>
                <li>
                  <Link to="/signup">회원가입</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/shopping-cart">장바구니</Link>
            </li>
          </ul>
            <div className="side-btn-close" onClick={handleClick}>
              <span></span>
            </div>
          </div>
          <div className="side-main">
          {userId && (
            <div className="side-login-info">
              <img src="/assets/images/profile.webp" alt="" /> <p>환영합니다, <strong>{userId}</strong>님!</p>
            </div>
          )}

          <ul className="side-menu">
            {categories.map((category) => (
              <li className="side-menu-category" key={category.id}>
                <div className="category-title">
                  <a
                    className="category-title-name"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.name}
                  </a>
                  <a
                    href="#none"
                    className={`open-item ${selectedCategories[category.id] ? 'selected' : ''}`}
                  ></a>
                </div>
                <ul className="side-inside">
                  {category.items.map((item, index) => (
                    <li
                      className={`side-item ${
                        selectedCategories[category.id] ? 'selected' : ''
                      }`}
                      key={`${category.id}-${index}`}
                    >
                      <Link to={`/Store`}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
          <div className="side-bottom">
            <ul className="bottom-menu">
              <Link to="/"><li>마이페이지</li></Link>
              <Link to="/"><li>주문/배송조회</li></Link>
              <Link to="/"><li>관심상품</li></Link>
              <Link to="/"><li>최근 본 상품</li></Link>
            </ul>
          </div>
        </div>
        <div className={`hamburger-modal-back ${isActive ? 'active' : ''}`} onClick={handleClick}></div>
      </div>
    </div>
  );
};

export default Header;