import React from 'react';
import '../../../styles/features/product/ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>
      
    </div>;
  }

  return (
    <div className="product-card">
      <div className="product-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">
          <span className="product-sale-rate">{product.saleRate} 할인</span>
          <span className="product-price-current">{product.price}원</span>
          <span className="product-price-original">{product.originalPrice}원</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;