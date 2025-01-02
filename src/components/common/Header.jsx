import React from 'react'
import '../../styles/common/Header.css'
import HeaderLogo from '../../assets/images/Logo(Yellow).png'; 
import Hamburger from '../../assets/images/ArrowBottom.png'; 
import ShopingCart from '../../assets/images/top_cart_btn_w.png'; 

const Header = () => {
  return (
    <div className='header'>
      <div className="header-wrap">
      <section class="header-top">
      <div class="header-left">
			<div class="hamburger-menu">
				<span class="all-btn-open">
        <img src={Hamburger} alt="" />
        </span>
			</div>
		</div>
        <h1 class="top-logo ">
          <a href="/">
            <img src={HeaderLogo} alt="" />
          </a>
        </h1>
		<div class="header-right">
			<ul class="top-account">
        <li class="shoppingcart">
          <a href="#">
            <em>
              <img src={ShopingCart} alt="" />
            </em>
          </a>
        </li>
			</ul>
      </div>
	</section>
      </div>
    </div>
  )
}

export default Header