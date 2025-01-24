import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const NewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/src/data/Product.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    overflow: 'hidden',
    padding: '20px',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // 2칸
    gridTemplateRows: 'repeat(3, auto)', // 3줄
    gap: '20px', // 간격
  };

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const imgStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '10px',
  };

  const infoStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const titleTextStyle = {
    fontSize: '1rem',
    marginBottom: '5px',
  };

  const priceStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.9rem',
  };

  const saleRateStyle = {
    color: 'red',
    fontWeight: 'bold',
  };

  const currentPriceStyle = {
    color: 'green',
  };

  const originalPriceStyle = {
    textDecoration: 'line-through',
    color: 'gray',
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>
        <h2>NEW 신제품</h2>
      </div>
      <Swiper slidesPerView={1} spaceBetween={0} loop={true}>
        {Array.from({ length: 10 }, (_, index) => (
          <SwiperSlide key={index}>
            <div style={gridStyle}>
              {products.slice(0, 6).map((item) => (
                <div style={itemStyle} key={`${item.id}-${index}`}>
                  <img style={imgStyle} src={item.image} alt={item.title} />
                  <div style={infoStyle}>
                    <h3 style={titleTextStyle}>{item.title}</h3>
                    <div style={priceStyle}>
                      <span style={saleRateStyle}>{item.saleRate}</span>
                      <span style={currentPriceStyle}>{item.price}원</span>
                      <span style={originalPriceStyle}>
                        {item.originalPrice}원
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewProduct;