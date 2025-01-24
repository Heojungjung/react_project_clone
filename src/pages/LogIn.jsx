import React, { useContext, useState } from 'react';
import Footer from '../components/common/Footer';
import LeftMenu from '../components/common/LeftMenu';
import SideFloating from '../components/common/SideFloating';
import '../styles/reset/reset.css';
import '../styles/pages/LogIn.css';
import HeaderSub from '../components/common/HeaderSub';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const LogIn = () => {
  const { setUserId } = useContext(AuthContext);
  const [activeKeyboard, setActiveKeyboard] = useState(null);
  const [inputId, setInputId] = useState(''); 
  const navigate = useNavigate();

  const handleKeyboard = (keyboard) => {
    setActiveKeyboard((prevKeyboard) => (prevKeyboard === keyboard ? null : keyboard));
  };

  const handleLogin = () => {
    if (inputId.trim()) {
      setUserId(inputId); 
      alert(`환영합니다! ${inputId} 님!`);
      navigate('/'); 
    } else {
      alert('아이디를 입력해주세요.');
    }
  };

  return (
    <div className="main-layout">
      <div className="content">
        <HeaderSub />
        <div className="main-inner">
          <h2 className="title">로그인</h2>
          <div className="login-area">
            <div className="loginHeader">
              <span className="ssl">
                <img src="/assets/images/ico_ssl.png" alt="" />
                <em>보안접속</em>
              </span>
              <div className="keyboard-container">
                <div className="keyboard">
                  <div
                    className={`btnKey_korean ${activeKeyboard === "korean" ? "active" : ""}`}
                    title="korean"
                    onClick={() => handleKeyboard("korean")}
                  >
                    한글자판
                    <img src="/assets/images/keyboard_toggle_btn.png" alt="" className="keyboard-toggle" />
                  </div>
                  <div
                    className={`btnKey_special ${activeKeyboard === "special" ? "active" : ""}`}
                    title="special"
                    onClick={() => handleKeyboard("special")}
                  >
                    특수문자
                    <img src="/assets/images/keyboard_toggle_btn.png" alt="" className="keyboard-toggle" />
                  </div>
                </div>
              </div>
            </div>
            <div className="view">
              <div className={`korean ${activeKeyboard === "korean" ? "active" : ""}`}>
                <img src="/assets/images/img_keyboard.png" alt="한글 키보드" width="254" />
              </div>
              <div className={`special ${activeKeyboard === "special" ? "active" : ""}`}>
                <img src="/assets/images/img_keyboard_special.png" alt="특수문자 키보드" width="254" />
              </div>
            </div>
            <div className="login-input-formbox">
              <input
                type="text"
                name="아이디박스"
                placeholder="아이디"
                value={inputId} 
                onChange={(e) => setInputId(e.target.value)} 
              />
              <input type="password" name="패스워드박스" placeholder="패스워드" />
              <button className="login-btn" onClick={handleLogin}>
                로그인
              </button>
              <div className="sub-items">
                <span>아이디찾기</span>
                <span>비밀번호찾기</span>
                <span>회원가입</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="left-wrap">
        <LeftMenu />
      </div>
      <SideFloating />
    </div>
  );
};

export default LogIn;