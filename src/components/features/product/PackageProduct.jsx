import React, { useState } from "react";
import ProductCard from './ProductCard'
import '../../../styles/features/product/PackageProduct.css';
import products from '../../../data/Product.json'; 

const PackageProduct = () => {
  // "스낵/음료" 카테고리만 필터링
  const filteredProducts = products.filter(product => product.category === "스낵/음료");

  return (
    <div className="PackageProducts">
      <div className="title">
        <h2>한끼닭 베스트</h2>
        <span>더보기 <b>+</b></span>
      </div>
      <div className="Package-product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default PackageProduct;