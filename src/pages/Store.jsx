import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeaderSub from "../components/common/HeaderSub";
import Footer from "../components/common/Footer";
import LeftMenu from "../components/common/LeftMenu";
import SideFloating from "../components/common/SideFloating";
import "../styles/reset/reset.css"; // 리셋 CSS
import "../styles/pages/Store.css";
import products from "../data/Product copy.json"; 
import ProductCard from "../components/features/product/ProductCard";

const Store = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sortOption, setSortOption] = useState('new');

  const categories = ["전체보기", "도시락/볶음밥", "실온 닭가슴살", "스낵/음료", "간편 분식", "한끼닭 식단"];

  const filteredProducts = activeIndex === 0
    ? products // "전체보기"를 선택한 경우 모든 제품 표시
    : products.filter(product => product.category === categories[activeIndex]);
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortOptions = [
    { value: 'new', label: '신상품' },           
    { value: 'name', label: '상품명' },       
    { value: 'lowPrice', label: '낮은가격' },   
    { value: 'highPrice', label: '높은가격' }, 
    { value: 'sale', label: '할인율' },     
  ];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'new':
        return b.id - a.id; // id를 기준으로 내림차순
      case 'name':
        return a.title.localeCompare(b.title); // 제목을 기준으로 오름차순
      case 'lowPrice':
        return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')); // 가격 오름차순
      case 'highPrice':
        return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, '')); // 가격 내림차순
      case 'sale':
        return parseInt(b.saleRate.replace('%', '')) - parseInt(a.saleRate.replace('%', '')); // 할인율 내림차순
      default:
        return 0;
    }
  });

  const wrapRef = useRef(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e) => {
    isDragging = true;
    wrapRef.current.classList.add("active");
    startX = e.pageX - wrapRef.current.offsetLeft;
    scrollLeft = wrapRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    wrapRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isDragging = false;
    wrapRef.current.classList.remove("active");
  };

  const handleMouseLeave = () => {
    isDragging = false;
    wrapRef.current.classList.remove("active");
  };

  return (
    <div className="main-layout">
      <div className="content">
        <HeaderSub /> 
        <div className="top-menu">
          <Link to="/">
            <span className="back-btn ">
              <img src="/assets/images/LeftBtn.png" alt="" />
            </span>
          </Link>
          <h2>한끼닭 스토어</h2>
          <span>{/* 여백용 */}</span>
        </div>
        <div className="banner">
          <img src="/assets/images/StoreBanner.png" alt="" />
        </div>
        <div 
          className="category-tap" 
          ref={wrapRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="category-wrap">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleClick(index)}>
                {category}
              </div>
            ))}
          </div>
        </div>
        <div className="option-tap">
        <div className="procount">
          총 <span>{filteredProducts.length}</span> 개
        </div>
          <div className="sort">
          <select
            id="selArray"
            name="selArray"
            className="select-table"
            value={sortOption}
            onChange={handleSortChange}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div className="product-list">
        {sortedProducts.map(product => (
            <Link
            to={{
              pathname: "/productDetail",
            }}
            state={{ product }} // product 데이터를 state로 전달
            className="StoreProduct"
          >
            <ProductCard key={product.id} product={product} />
          </Link>
        ))}
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

export default Store;
