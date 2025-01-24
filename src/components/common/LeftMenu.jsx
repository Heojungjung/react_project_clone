import React from 'react'
import { Link } from "react-router-dom";
import Category from '../features/category/CategoryItem'
import '../../styles/common/LeftMenu.css'
import LeftMenuBanner from '../../assets/images/LeftMenuBanner.png'; // 이미지 import


const LeftMenu = () => {
  return (
    <div className='leftMenu'>
      <a href="#none">
      </a>
      <div className="search_bar">
      <input type="search" placeholder='어떤 상품을 찾으시나요?'/>
      </div>
      <div className="categorys">
      <Link to="/store">
      <Category>
      </Category>
      </Link>
      </div>
      <div className="leftMenu-banner">
      <img src={LeftMenuBanner} alt="Left Menu Banner" />
      </div>
    </div>
  )
}

export default LeftMenu