import React, { useState } from "react";
import { useLocation, useParams ,Link } from "react-router-dom";
import HeaderSub from "../components/common/HeaderSub";
import Footer from "../components/common/Footer";
import LeftMenu from "../components/common/LeftMenu";
import SideFloating from "../components/common/SideFloating";
import "../styles/pages/ProductDetail.css";
import products from "../data/Product copy.json"; 

const ProductDetailPage = () => {
  const location = useLocation();
  const productFromState = location.state?.product;

  const [isShareVisible, setIsShareVisible] = useState(false);
  const [quantities, setQuantities] = useState({}); 


  const toggleShare = () => {
    setIsShareVisible((prev) => !prev); 
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    const link = "https://naver.com";

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopySuccess(true); 
        setTimeout(() => setCopySuccess(false), 1000); 
      })
      .catch((error) => {
        console.error("Failed to copy the link: ", error);
      });
  };

  const productId = location.state?.product?.id || 1;

  const product = productFromState || products.find(p => p.id === productId);

  const [selectedOptions, setSelectedOptions] = useState([]); // 선택된 옵션 관리
  const [option, setOption] = useState(""); // 현재 선택된 옵션 관리

  const productSelectChange = (e) => {
    const selectedValue = e.target.value;
  
    if (selectedValue && !selectedOptions.includes(selectedValue)) {
      setSelectedOptions([...selectedOptions, selectedValue]); // 옵션 추가
      setQuantities({ ...quantities, [selectedValue]: 1 }); // 기본 수량 1로 설정
    }
  };
  
  const updateQuantity = (option, delta) => {
    setQuantities({
      ...quantities,
      [option]: Math.max(1, (quantities[option] || 1) + delta), // 기본값 1로 초기화 후 연산
    });
  };

  const productRemoveOption = (optionToRemove) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt !== optionToRemove)); // 옵션 제거
  };

  const safeNumber = (value) => Number(value?.toString().replace(/[^0-9.-]/g, "")) || 0;

  const calculateTotal = () => {
    let total = 0;
    let totalQty = 0;
    
    // 각 옵션에 대해 가격과 수량을 계산
    selectedOptions.forEach((opt) => {
      const price = safeNumber(product.price) * (quantities[opt] || 1); // 가격 * 수량
      total += price;
      totalQty += quantities[opt] || 1; // 수량 합산
    });
  
    return { total, totalQty };
  };
  
  const { total, totalQty } = calculateTotal();

  const [isLiked, setIsLiked] = useState(false); 

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev); 
  };
  const [cartMessage, setCartMessage] = useState(""); 

  const handleCartClick = () => {
    if (selectedOptions.length === 0) {
      setCartMessage("상품 옵션을 선택해주세요!");
    } else {
      setCartMessage("장바구니에 상품이 담겼습니다!");
    }
    setTimeout(() => {
      setCartMessage("");
    }, 1000);
  };
    const [activeTab, setActiveTab] = useState("상세정보"); 
  
    const handleSubTab = (tab) => {
      setActiveTab(tab);
    };


    const [activeIndex, setActiveIndex] = useState(null);

      const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index); 
      };
  
  return (
    <div className="main-layout">
      <div className="content">
        <HeaderSub />
        <div className="product-main">
          <Link to="/">
          <div className="back-btn">
            <img src="/assets/images/LeftBtn.png" alt="backbtn" />
          </div>
          </Link>
          <div className="main-img">
            <img src={product.image} alt={product.title} /> {/* 이미지 표시 */}
          </div>
          <div className="product-details">
            <h2>{product.title}
              <img src="/assets/images/detail_share_btn.png" alt="" onClick={toggleShare}/>
              <div className={`sns-share ${isShareVisible ? "active" : ""}`}>
                <div className="close-btn" onClick={toggleShare}>
                  <img src="/assets/images/close-icon.svg" alt="" />
                </div>
                <div className="share-icons">
                  <img src="/assets/images/share-facebook.gif" alt="" />
                  <img src="/assets/images/share-twitter.gif" alt="" />
                </div>
                <div className="share-url">
                  <h4 onClick={handleCopyLink}>https://naver.com <img src="/assets/images/share_link_icon.png" alt="" /></h4>
                </div>
              </div>
            </h2> 
            {copySuccess && <div className="copy-alert">주소가 복사되었습니다!</div>}
            <div className="price-data">
              <p className="saleRate">{product.saleRate}</p> 
              <p className="price">{product.price}원</p> 
              <p className="original">{product.originalPrice}원</p> 
            </div>
          </div>
          <div className="delivery-details">
            <div className="delivery-tab">
              <p>배송방법</p>
              <p>택배</p>
            </div>
            <div className="delivery-tab">
              <p>배송비</p>
              <p>2,500원 (50,000원 이상 구매 시 무료) </p>
            </div>
            <div className="delivery-select">
              <p>종류-개수</p>
              <select value={option} onChange={productSelectChange} className="select-box">
              <option value="" selected="" >- [필수] 옵션을 선택해 주세요 -</option>
              <option value="" disabled >-------------------</option>
                <optgroup label="종류-개수">
                <option value="1세트 - 1가지 맛">1세트 - 1가지 맛</option>
                <option value="1세트 - 2가지 맛">1세트 - 2가지 맛</option>
                <option value="1세트 - 모든 맛 1봉">1세트 - 모든 맛 1봉</option>
                <option value="2세트 - 1가지 맛">2세트 - 1가지 맛</option>
                <option value="2세트 - 2가지 맛">2세트 - 2가지 맛</option>
                <option value="2세트 - 모든 맛 1봉">2세트 - 모든 맛 1봉</option>
                </optgroup>
              </select>
            </div>
            <div className="option-product">
              {selectedOptions.map((opt, index) => (
                <div key={index} className="option-item">
                  <p className="item-name">{opt}</p>
                  <div className="item-number">
                  <button
                    onClick={() => updateQuantity(opt, -1)}
                    className="minus-btn"
                  >
                    -
                  </button>

                  <span className="quantity">{quantities[opt]}</span>

                  <button
                    onClick={() => updateQuantity(opt, 1)}
                    className="plus-btn"
                  >
                    +
                  </button>
                    <button
                      onClick={() => productRemoveOption(opt)}
                      className="remove-item"
                    >
                      <img src="/assets/images/btn_price_delete.gif" alt="" />
                    </button>
                  </div>
                  <p className="item-price">
                    {(safeNumber(product.price) * (quantities[opt] || 1)).toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>
            <div className="total-price">
              <h3>총 상품금액(수량) : </h3>
              <h2 className="total-sum">
                {total.toLocaleString()}원
                <span className="num">({totalQty}개)</span>
              </h2>
            </div>
            <div className="cart-buy-tap">
                <img
                  src={isLiked ? "/assets/images/LikeThis.png" : "/assets/images/LikeitBtn.png"}
                  alt="Like Button"
                  className="Likeit"
                  onClick={handleLikeClick} 
                />
               <button className="going-cart" onClick={handleCartClick}>
                장바구니
              </button>          
              <Link to="/shopping-cart">    
              <button className="going-buy">
               구매하기 
              </button>
              </Link>
            </div>
            {cartMessage && <div className="cart-message">{cartMessage}</div>}
          </div>
        </div>
        <div className="product-sub">
          <div className="sub-tabs">
            <div
              className={`sub-tab ${activeTab === "상세정보" ? "active" : ""}`}
              onClick={() => handleSubTab("상세정보")}
            >
              상세정보
            </div>
            <div
              className={`sub-tab ${activeTab === "상품후기" ? "active" : ""}`}
              onClick={() => handleSubTab("상품후기")}
            >
              상품후기
            </div>
            <div
              className={`sub-tab ${activeTab === "상품문의" ? "active" : ""}`}
              onClick={() => handleSubTab("상품문의")}
            >
              상품문의
            </div>
            <div
              className={`sub-tab ${activeTab === "구매정보" ? "active" : ""}`}
              onClick={() => handleSubTab("구매정보")}
            >
              구매정보
            </div>
          </div>
          <div className="product-info-01" style={{ display: activeTab === "상세정보" ? "block" : "none" }}>
            <div className="look-btn">
              원본보기
              <img src="/assets/images/ico_expand.png" alt="" />
            </div>
            <img src="/assets/images/product-detail-img01.jpg" alt="" className="sampleimg"/>
            <img src="/assets/images/product-detail-img02.jpg" alt="" className="sampleimg"/>
            <img src="/assets/images/product-detail-img03.jpg" alt="" className="sampleimg"/>
          </div>
          <div className="product-info-02" style={{ display: activeTab === "상품후기" ? "block" : "none" }}>
            <div className="btns-tap">
             <button className="LookAll">전체보기</button>
             <button className="WriteBtn">상품후기쓰기</button>
            </div>
            <div className="info-2-main">
              게시물이 없습니다.
            </div>
          </div>
          <div className="product-info-03" style={{ display: activeTab === "상품문의" ? "block" : "none" }}>
          <div className="btns-tap">
             <button className="LookAll">전체보기</button>
             <button className="WriteBtn">상품문의쓰기</button>
            </div>
            <div className="info-3-main">
              게시물이 없습니다.
            </div>
          </div>
          <div className="product-info-04" style={{ display: activeTab === "구매정보" ? "block" : "none" }}>
          <div className="toggle-infos">
        {[
          {
            title: "배송안내",
            content: (
              <p>
                배송 방법 : 택배 <br />
                배송 지역 : 전국지역 <br />
                배송 비용 : 2,500원 <br />
                배송 기간 : 3일 ~ 7일 <br />
                배송 안내 : - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는
                경우가 있습니다. <br />
                고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만,
                상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
                <br />
              </p>
            ),
          },
          {
            title: "교환/반품안내",
            content: (
              <p>
              <b>교환 및 반품 주소</b> <br/>
                - <br/>
              <b>교환 및 반품이 가능한 경우</b> <br/>
                - 계약내용에 관한 서면을 받은 날부터 7일. 단, 그 서면을 받은 때보다 재화등의 공급이 늦게 이루어진 경우에는 재화등을 공급받거나 재화등의 공급이 시작된 날부터 7일 이내  <br/>
                  - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날 부터 3월이내, 그사실을 알게 된 날 또는 알 수 있었던 날부터 30일이내 <br/>
                  <br/>
              <b>교환 및 반품이 불가능한 경우</b>  <br/>
                - 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만, 재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다)  <br/>
                  - 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우  <br/>
                  - 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우 <br/>
                  - 복제가 가능한 재화등의 포장을 훼손한 경우 <br/>
                  - 개별 주문 생산되는 재화 등 청약철회시 판매자에게 회복할 수 없는 피해가 예상되어 소비자의 사전 동의를 얻은 경우  <br/>
                  - 디지털 콘텐츠의 제공이 개시된 경우, (다만, 가분적 용역 또는 가분적 디지털콘텐츠로 구성된 계약의 경우 제공이 개시되지 아니한 부분은 청약철회를 할 수 있습니다.)  <br/>
                
                ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다. <br/>
                (색상 교환, 사이즈 교환 등 포함)<br/>
              </p>
            ),
          },
          {
            title: "결제 안내",
            content: (
              <p>
              고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. <br/> 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.  <br/>
              <br/>

              무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.  <br/><br/>
              주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.<br/>
              </p>
            ),
          },
      ].map((item, index) => (
        <div className="info-item" key={index}>
          <div
            className="title"
            onClick={() => toggleAccordion(index)}
            style={{ cursor: "pointer" }}
          >
            <h3>{item.title}</h3>
            <img
              src={
                activeIndex === index
                  ? "/assets/images/detail_more_icon_on.png"
                  : "/assets/images/detail_more_icon.png"
              }
              alt=""
              className="more-icon"
            />
          </div>
          <div
            className="inner"
            style={{
              display: activeIndex === index ? "block" : "none",
            }}
          >
            {item.content}
          </div>
        </div>
      ))}
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

export default ProductDetailPage;