import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ModalBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  h2 {
    margin: 8px 0 24px 0;
  }
`;

const Input = styled.input`
  font-family: "Pretendard Variable";
  width: auto;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  font-family: "Pretendard Variable";
  width: auto;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  gap: 10px;
  width: 100%;
`;

const Button = styled.button`
  width: 50%;
  font-family: "Pretendard Variable";
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #b4b4b4;
`;

const SubmitButton = styled(Button)`
  background-color: #47bcff;
`;

function Modal({ setIsModalOpen, title, content }) {
  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toISOString().split(".")[0];

  const [summary, setSummary] = useState(title);
  const [description, setDescription] = useState(content.join("\n"));
  const [startDate, setStartDate] = useState(currentTime);
  const [endDate, setEndDate] = useState(currentTime);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const eventData = {
      summary,
      description,
      startDate,
      endDate,
    };

    try {
      await axios.post(
        "https://ajou-event.shop/api/event/calendar",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error submitting the event!", error);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate < startDate) {
      setEndDate(startDate);
    } else {
      setEndDate(newEndDate);
    }
  };

  return (
    <ModalBackgroundContainer>
      <ModalContainer>
        <h2>이벤트 캘린더 등록</h2>
        <Input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="datetime-local"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="datetime-local"
          placeholder="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>캘린더에 등록</SubmitButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackgroundContainer>
  );
}

export default Modal;
