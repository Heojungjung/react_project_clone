import React, { useEffect, useState } from 'react';
import '../../../styles/features/product/NewProduct.css'

const NewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/src/data/Product.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


  return (
    <div className='NewProduct'>
      <div className='title'>
        <h2>NEW 신제품</h2>
      </div>


    </div>
  );
};

export default NewProduct;