import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderSub from '../components/common/HeaderSub';
import Footer from '../components/common/Footer';
import LeftMenu from '../components/common/LeftMenu';
import SideFloating from '../components/common/SideFloating';
import '../styles/reset/reset.css'; 
import '../styles/pages/HomePage.css';
import '../styles/pages/ShoppingCart.css';
import productData from '../data/Product copy.json';

const ShoppingCart = () => {
  const [products, setProducts] = useState(productData); 
  const [isToggle, setIsToggle] = useState(false);

  // 장바구니 접기/펼치기
  const handleItemToggle = () => {
    setIsToggle((prev) => !prev);
  };

  // 아이템 삭제
  const handleItemDelete = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  // 총 상품 금액 계산
  const totalProductPrice = products.reduce((sum, product) => {
    const price = Number(product.price.replace(/,/g, '')); // 쉼표 제거 후 숫자로 변환
    return sum + price;
  }, 0);

  // 배송비 계산 (총 상품 금액이 50,000원 이상이면 무료)
  const deliveryFee = totalProductPrice >= 50000 ? 0 : 2500;

  // 결제 예정 금액
  const totalPayment = totalProductPrice + deliveryFee;

  return (
    <div className="main-layout">
      <div className="content">
        <HeaderSub /> 
        <div className="main-inner">
          <div className="title">
            <Link to="/">            
              <img src="/assets/images/LeftBtn.png" alt="뒤로가기 버튼" />
            </Link>
            <h2>장바구니</h2> 
            <span></span>
          </div>
          <div className="title-tap">
            장바구니 진열 상품 ({products.length}) 개
          </div>
          <div className="main-cart">
            <div className="cart-item-wrap">
              <div className="wrap-title" onClick={handleItemToggle}>
                <h2>장바구니 상품</h2>
                <img
                  src="/assets/images/ico_arrow_white.png"
                  alt="접기/펼치기 버튼"
                  className={isToggle ? "rotate" : ""} 
                />        
              </div>
            </div>
            {!isToggle &&
              products.map((product) => (
                <div 
                  key={product.id} 
                  className="cart-item"
                >
                  <div className="cart-info">
                    <input type="checkbox" className="item-checkbox" />
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="cart-item-img" 
                    />
                    <div className="cart-product-info">
                      <div className="cart-product-title">{product.title}</div>
                      <div className="cart-product-price">
                        상품 구매 금액 : {Number(product.price.replace(/,/g, '')).toLocaleString()} 원
                      </div>
                      <div className="cart-product-discount">
                        <b>할인 금액</b> : {Number(product.originalPrice.replace(/,/g, '')).toLocaleString()} 원
                      </div>
                    </div>
                    {/* 삭제 버튼 */}
                    <img 
                      src="/assets/images/CloseBtn.png" 
                      alt="삭제 버튼" 
                      className="close-btn" 
                      onClick={(e) => {
                        e.stopPropagation(); // 부모 이벤트 전파 방지
                        handleItemDelete(product.id); // 아이템 삭제
                      }}
                    />
                  </div>
                </div>
              ))
            }
          </div>
          {/* 결제 및 가격 표시 */}
          <div className="cart-total-price">
            <div className="total-price-tap">
              <p>결제예정금액</p>
              <h2>{totalPayment.toLocaleString()} 원</h2>
            </div>
            <div className="total-product-price">
              <p>총 상품금액</p>
              <h2>{totalProductPrice.toLocaleString()} <span>원</span></h2>
            </div>
            <div className="total-delivery-price">
              <p>총 배송비</p>
              <h2>{deliveryFee.toLocaleString()} <span>원</span></h2>
            </div>
          </div>
          <div className="cart-buying-btns">
            <button className="selected-product-buy">선택상품주문</button>
            <button className="all-product-buy">전체상품주문</button>
          </div>
          <div className="bottom-notice">
            <img src="/assets/images/ico_help.png" alt="도움말 아이콘" />
            할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.
          </div>
        </div>
        <Footer />
      </div>
      <div className="left-wrap">
        <LeftMenu />
      </div>
      <SideFloating />
    </div>
  );
};

export default ShoppingCart;