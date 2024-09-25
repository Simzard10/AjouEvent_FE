import React, { useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100vw;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vw;
`;

const StyledCarousel = styled(Carousel)`
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    color: #434a52;
    background-color: #434a52; /* 화살표 색상 변경 */
    background-size: 100%, 100%; /* 화살표 아이콘의 크기 조정 */
    border-radius: 50%; /* 원형으로 만들기 */
    width: 30px;
    height: 30px;
  }

  .carousel-indicators {
    position: absolute;
    bottom: -30px; /* 배너 아래로 이동 */
    left: 50%;
    transform: translateX(-50%);
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel-indicators button {
    background-color: gray; /* 비활성 인디케이터 색상 */
    width: 10px; /* 인디케이터의 너비 */
    height: 10px; /* 인디케이터의 높이 */
    border-radius: 50%; /* 타원형으로 만들기 */
    opacity: 0.5; /* 비활성 인디케이터의 투명도 */
    margin: 0 4px; /* 인디케이터 간의 간격 */
  }

  .carousel-indicators .active {
    background-color: #434a52; /* 활성 인디케이터 색상 */
    opacity: 1; /* 활성 인디케이터의 투명도 */
    width: 20px; /* 활성 인디케이터의 너비 */
    height: 15px; /* 활성 인디케이터의 높이 */
    border-radius: 50px; /* 타원형으로 만들기 */
  }
`;

const CarouselItemImage = styled.img`
  width: 100%;
  height: 100vw;
  object-fit: contain;
  cursor: pointer;
`;

export default function HomeBanner({ images }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <BannerContainer>
      <CarouselWrapper>
        <StyledCarousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={true}
          interval={null}
          touch={true}
        >
          {images.map((image, idx) => (
            <Carousel.Item key={idx} onClick={() => handleClick(image.siteUrl)}>
              <CarouselItemImage src={image.imgUrl} alt={`Slide ${idx + 1}`} />
            </Carousel.Item>
          ))}
        </StyledCarousel>
      </CarouselWrapper>
    </BannerContainer>
  );
}
