import React, { useEffect, useRef } from 'react';
import '../../styles/common/SideFloating.css';

const SideFloating = () => {
  const sideTextRef = useRef(null);
  const sideFloatingWrapRef = useRef(null);

  useEffect(() => {
    const sideText = sideTextRef.current;
    const sideFloatingWrap = sideFloatingWrapRef.current;

    const handleMouseEnter = () => {
      if (sideText) {
        sideText.classList.add('active');
      }
    };

    const handleMouseLeave = () => {
      if (sideText) {
        sideText.classList.remove('active');
      }
    };

    if (sideFloatingWrap) {
      sideFloatingWrap.addEventListener('mouseenter', handleMouseEnter);
      sideFloatingWrap.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup event listeners
    return () => {
      if (sideFloatingWrap) {
        sideFloatingWrap.removeEventListener('mouseenter', handleMouseEnter);
        sideFloatingWrap.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className='sideFloating'>
      <div className="sideFloating-wrap" ref={sideFloatingWrapRef}>
        <img src="/assets/images/sideFloating.png" alt="사이드으" />
      </div>
      <span className='sideText' ref={sideTextRef}>
        한끼닭 문의 / 상담
      </span>
    </div>
  );
};

export default SideFloating;
