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

const CarouselItemImage = styled.img`
  width: 100%;
  height: 100vw;
  object-fit: contain;
`;

export default function HomeBanner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <BannerContainer>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={true}
        interval={null}
        touch={true}
      >
        <Carousel.Item>
          <CarouselItemImage
            src={`${process.env.PUBLIC_URL}/icons/TestBanner2.svg`}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselItemImage
            src={`${process.env.PUBLIC_URL}/icons/TestBanner2.svg`}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <CarouselItemImage
            src={`${process.env.PUBLIC_URL}/icons/TestBanner2.svg`}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="carousel-indicators">
        <button
          type="button"
          onClick={() => handleSelect(0)}
          className={index === 0 ? "active" : ""}
          aria-current={index === 0 ? "true" : undefined}
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          onClick={() => handleSelect(1)}
          className={index === 1 ? "active" : ""}
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          onClick={() => handleSelect(2)}
          className={index === 2 ? "active" : ""}
          aria-label="Slide 3"
        ></button>
      </div>
    </BannerContainer>
  );
}