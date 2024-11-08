import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 80%;
  max-height: 80%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%; 
  object-fit: contain; 
  border-radius: 8px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const PrevButton = styled(ArrowButton)`
  left: -30px;
`;

const NextButton = styled(ArrowButton)`
  right: -30px;
`;

function ImageModal({ images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Image src={images[index]} alt={`Image ${index + 1}`} />
        {images.length > 1 && (
          <>
            <PrevButton onClick={handlePrev}>&lt;</PrevButton>
            <NextButton onClick={handleNext}>&gt;</NextButton>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

export default ImageModal;