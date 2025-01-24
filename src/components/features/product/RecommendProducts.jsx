import React, { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import '../../../styles/features/product/RecommendProducts.css';
import products from '../../../data/Product.json'; 

const RecommendProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "도시락/볶음밥",
    "실온 닭가슴살",
    "스낵/음료",
    "간편 분식",
    "한끼닭 식단",
  ];

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const filteredProducts = activeIndex === null
    ? products
    : products.filter(product => product.category === categories[activeIndex]);

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
    <div className="RecommendProduct">
      <div className="title">
        <h2>한끼닭 MD 추천</h2>
        <span>더보기 <b>+</b></span>
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
              onClick={() => handleClick(index)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendProducts;