import React, { useRef, useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Link } from "react-router-dom";
import LeftMenu from '../components/common/LeftMenu';
import SideFloating from '../components/common/SideFloating';
import NewProduct from '../components/features/product/NewProduct'
import BestProducts from '../components/features/product/BestProducts';
import '../styles/reset/reset.css';
import '../styles/pages/HomePage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import EventPage from '../components/features/product/EventPage';
import RecommendProducts from '../components/features/product/RecommendProducts';
import PackageProduct from '../components/features/product/PackageProduct';

const Homepage = () => {
  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [slideColor, setSlideColor] = useState({
    backgroundColor: '#CC002F',
    textColor: '#CC002F',
  });

  const slideColors = [
    { backgroundColor: '#CC002F', textColor: '#CC002F' }, // 1번 슬라이드 색상
    { backgroundColor: '#0C5C56', textColor: '#0C5C56' }, // 2번 슬라이드 색상
    { backgroundColor: '#FF5B28', textColor: '#FF5B28' }, // 3번 슬라이드 색상
  ];

  useEffect(() => {
    const swiperInstance = swiperRef.current ? swiperRef.current.swiper : null;

    if (swiperInstance) {
      // 슬라이드 색상 업데이트
      const updateSlideColor = () => {
        const currentIndex = swiperInstance.realIndex; // 현재 활성화된 슬라이드 인덱스
        setSlideColor(slideColors[currentIndex]); // 해당 슬라이드의 색상으로 업데이트
      };

      // 진행 상태 업데이트
      const updateProgress = () => {
        const totalSlides = swiperInstance.slides.length - 2; // 루프에서 제외되는 슬라이드 제외
        const currentSlide = swiperInstance.realIndex;
        const progressPercent = ((currentSlide + 1) / totalSlides) * 100; // 진행 상태 계산
        setProgress(progressPercent);
      };

      // 슬라이드 변경 시 색상과 진행 상태 업데이트
      swiperInstance.on('slideChange', () => {
        updateSlideColor();
        updateProgress();
      });

      // 최초 렌더링 시 초기화
      updateSlideColor();
      updateProgress();

      // 클린업 함수
      return () => {
        swiperInstance.off('slideChange', updateSlideColor);
        swiperInstance.off('slideChange', updateProgress);
      };
    }
  }, []);

  return (
    <div className="main-layout">
      <div className="content">
        <Header />
        <div className="main-visual" style={{ backgroundColor: slideColor.backgroundColor }}>
          <Swiper
            ref={swiperRef}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false, // 사용자가 슬라이드를 클릭해도 자동 재생 유지
            }}
            effect="fade"
          >
            <SwiperSlide>
              <a href="#none" style={{ color: slideColor.textColor }}>
                <span>
                  <img src="assets/images/MainSlideImg_01.png" className="w100" alt="프로틴 그래놀라" />
                </span>
                <div className="visual-title">
                  <em><span>프로틴 그래놀라</span></em>
                  <h3>
                    <span>고소담백한 프로틴<br />수제 그래놀라</span>
                  </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="#none" style={{ color: slideColor.textColor }}>
                <span>
                  <img src="assets/images/MainSlideImg_02.png" className="w100" alt="명불허전 한끼닭" />
                </span>
                <div className="visual-title">
                  <em><span>명불허전 한끼닭</span></em>
                  <h3>
                    <span>현명하고 맛있는<br />하루 한 끼 식사</span>
                  </h3>
                </div>
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="#none" style={{ color: slideColor.textColor }}>
                <span>
                  <img src="assets/images/MainSlideImg_03.png" className="w100" alt="요거트 아이스크림" />
                </span>
                <div className="visual-title">
                  <em><span>요거트 아이스크림</span></em>
                  <h3>
                    <span>메뉴&amp;토핑을 취향대로!<br />요거트 아이스크림</span>
                  </h3>
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
          <div className="slide-control">
            <div className="slide-progress">
              <div className="progress active">
                <div
                  className="bar"
                  style={{
                    width: `${progress}%`, // 진행 상태에 맞는 width 적용
                    animationDuration: '3000ms', // 자동 슬라이드 진행 시간에 맞춰 설정
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="wave-wrapper">
            <svg id="wave" viewBox="0 0 1440 365.38" fill="none">
              <path d="M 0 59.9547 C 307.185 122.808 534.699 46.5899 847.24 39.6827 C 1159.78 32.7756 1270.98 45.0236 1440 59.9547 V 351.955 H 0 V 59.9547 Z">
                <animate repeatCount="indefinite" fill="freeze" attributeName="d" dur="4.5s" values="M0 95.654C277.431 -69.1705 408 11.654 720 95.654C1032 179.654 1207.5 144.328 1440 95.654V387.654H0V95.654Z; M0 69.3411C342 69.3411 652 -51.313 994 25.687C1336 102.687 1354 103.687 1440 69.3411V361.341H0V69.3411Z; M0 51.8168C277 169.163 433 131.471 720 51.8168C1007 -27.8372 1199 -5.83717 1440 51.8168V343.817H0V51.8168Z; M0 95.654C277.431 -69.1705 408 11.654 720 95.654C1032 179.654 1207.5 144.328 1440 95.654V387.654H0V95.654Z"></animate>
              </path>
            </svg>
          </div>
        </div>
        <div className="category-section">
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_01.png" alt="" />
            <span>닭가슴살</span>
          </div>
          </Link>
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_02.png" alt="" />
            <span>간편한끼</span>
          </div>
          </Link>
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_03.png" alt="" />
            <span>그래놀라</span>
          </div>
          </Link>
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_04.png" alt="" />
            <span>디저트</span>
          </div>
          </Link>
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_05.png" alt="" />
            <span>그릭요거트</span>
          </div>
          </Link>
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_06.png" alt="" />
            <span>간편분식</span>
          </div>
          </Link>
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_07.png" alt="" />
            <span>닭다리살</span>
          </div>
          </Link>
          <Link to="/store">
          <div className="categoryitem">
            <img src="/assets/images/CategoryItem_08.png" alt="" />
            <span>더보기</span>
          </div>
          </Link>
        </div>
        <NewProduct/>
        <div className="sub-section-03">
          <img src="assets/images/MainBannerImg.png" alt="" />
        </div>
        <BestProducts>
        </BestProducts>
        <EventPage></EventPage>
        <RecommendProducts/>
        <PackageProduct></PackageProduct>
        <Footer />
      </div>
      <div className="left-wrap">
        <LeftMenu />
      </div>
      <SideFloating />
    </div>
  );
};

export default Homepage;