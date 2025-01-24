import React from 'react'
import '../../styles/common/Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrap">
      <div className="footer-top">
        <div className="title">
          CS CENTER
        </div>
        <div className="tel">
          010-5582-3984
        </div>
        <div className="info">
          <h4>평일 : 09:00 ~ 18:00 &#40; 점심 : 12:00 ~ 13:00 &#41; </h4>
        </div>
      </div>
      <div className="footer-mid">
        <div className="title">
          BANK INFO
        </div>
        <div className="tel">
          940302-00-332670
        </div>
        <div className="info">
          <h4>국민은행 <br/>
           예금주 : 허정정</h4>
        </div>
      </div>
      <div className="footer-bottom">
        <div className='logo-area'>
          <img src="/assets/images/Logo(white).png" alt="한끼닭로고"/>
        </div>
        <div className="footer-rules">
          <div className="item">
          회사소개</div>      
          <div className="item">
          이용약관</div>      
          <div className="item">
          이용안내</div>      
          <div className="item">
          개인정보처리방침
          </div>      
        </div>
        <div className="footer-address">
          상호 : 디자인교과서 대표 : 서수정 대표번호 : 1644-8198
          주소 : 04387 서울 용산구 서빙고로 17 용산센트럴파크타워 608호 사업자등록번호 : 000-0000-0000 팩스 : 00-0000-0000 개인정보관리책임자 : 서수정 통신판매업신고 : 000-000-00000
          </div>
          <div className="footer-copyright">
          Copyright© 디자인교과서. All Rights Reserved.
          </div>
          <div className="footer-icons">
          <div className="icon">
            <img src="/assets/images/SnsImg_01.png" alt="카톡" />
          </div>
          <div className="icon">
          <img src="/assets/images/SnsImg_02.png" alt="페북" />
          </div>
          <div className="icon">
          <img src="/assets/images/SnsImg_03.png" alt="네이버" />
          </div>
          <div className="icon">
          <img src="/assets/images/SnsImg_04.png" alt="인스타"/>
          </div>
          <div className="icon">
          <img src="/assets/images/SnsImg_05.png" alt="유튭" />
          </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Footer