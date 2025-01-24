import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';  // Swiper를 import 합니다.
import '../../../styles/features/product/NewProduct.css'; // 스타일 시트
import "swiper/css";



const NewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('data/Product.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 2,  
      spaceBetween: 200,  
      loop: true,
      grabCursor: true,
      draggable: true,
      clickable: true,
    });
  }, []);

  return (
    <div className="NewProduct">
      <div className="title">
        <h2>NEW 신제품</h2>
      </div>
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {products.map((item, index) => {
            const isMainImage = index % 3 === 0; 
            const isSubImage = index % 3 !== 0; 
            
            if (index % 3 === 0) {
              const nextItem = products[index + 1];
              const nextNextItem = products[index + 2];

              return (
                <div key={item.id} className="swiper-slide">
                  <div className="NewProduct-main">
                    <a href="#none">
                      <span className='NewProduct-main-img'><img src={item.image} alt={item.title} /></span>
                      <h2 className='NewProduct-product-title'>{item.category}</h2>
                    </a>
                  </div>
                  <div className="NewProduct-product-details">
                    {nextItem && (
                      <div className="NewProduct-product-subitem">
                        <img src={nextItem.image} alt={nextItem.title} className="NewProduct-product-image" />
                        <div className="NewProduct-info-wrap">
                          <p className="NewProduct-product-name">{nextItem.title}</p>
                          <div className="NewProduct-product-price-data">
                          <p className='NewProduct-product-salerate'>{nextItem.saleRate}</p>
                          <p className="NewProduct-product-price">{nextItem.price}원</p>
                          <p className="NewProduct-product-original-price">{nextItem.originalPrice}원</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {nextNextItem && (
                      <div className="NewProduct-product-subitem">
                        <img src={nextNextItem.image} alt={nextNextItem.title} className="NewProduct-product-image" />
                        <div className="NewProduct-info-wrap">
                          <p className="NewProduct-product-name">{nextNextItem.title}</p>
                          <div className="NewProduct-product-price-data">
                          <p className='NewProduct-product-salerate'>{nextNextItem.saleRate}</p>
                          <p className="NewProduct-product-price">{nextNextItem.price}원</p>
                          <p className="NewProduct-product-original-price">{nextNextItem.originalPrice}원</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;