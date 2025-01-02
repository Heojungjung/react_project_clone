import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import HamburgerMenu from '../components/common/HamburgerMenu'
import LeftMenu from '../components/common/LeftMenu'
import SideFloating from '../components/common/SideFloating'
import '../styles/reset/reset.css' //리셋 css

const Homepage = () => {
  return (
    <div className='main-layout'>
    <Header></Header>
    <Footer></Footer>
    <HamburgerMenu></HamburgerMenu>
    <LeftMenu></LeftMenu>
    <SideFloating></SideFloating>
    </div>
  )
}

export default Homepage