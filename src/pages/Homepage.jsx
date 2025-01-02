import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import HamburgerMenu from '../components/common/HamburgerMenu'
import LeftMenu from '../components/common/LeftMenu'
import SideFloating from '../components/common/SideFloating'
import '../styles/reset/reset.css' //리셋 css
import '../styles/pages/HomePage.css'

const Homepage = () => {
  return (
    <div className='main-layout'>
      <div className="content">
      <Header></Header>
      <Footer></Footer>
      </div>
    <HamburgerMenu></HamburgerMenu>
    <div className="left-wrap">
    <LeftMenu></LeftMenu>
    </div>
    <SideFloating></SideFloating>
    </div>
  )
}

export default Homepage