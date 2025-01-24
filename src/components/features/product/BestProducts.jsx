import React, {useState} from "react";
import ProductCard from "./ProductCard";
import '../../../styles/features/product/BestProducts.css';
import products from '../../../data/Product.json'; 
import { Link } from "react-router-dom";

const BestProducts = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    "전체",
    "닭가슴살",
    "간편한끼",
    "샐러드",
    "음료/프로틴"
  ];

  const categoryMap = {
      "전체": null, 
      "닭가슴살": "실온 닭가슴살",  
      "간편한끼": "간편 분식",
      "샐러드": "한끼닭 식단",
      "음료/프로틴": "스낵/음료"
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const filteredProducts = activeIndex === 0  
  ? products
  : products.filter(product => product.category === categoryMap[categories[activeIndex]]);


  return (
    <div className="BestProducts">
      <div className="title">
        <h2>한끼닭 베스트</h2>
        <Link to='/store'>
        <span>더보기 <b>+</b></span>
        </Link>
      </div>
      <div className="Best-category-tap">
        <div className="category-wrap">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`Best-category-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <Link to='/productDetail'>
          <ProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;