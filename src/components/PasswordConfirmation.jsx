import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  font-family: "Pretendard Variable";
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 120%;
`;

const Label = styled.label`
  font-family: "Pretendard Variable";
  margin-bottom: 5px;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  flex-grow: 1;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const TogglePasswordVisibility = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: rgb(0, 102, 179);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #333;
  }
`;


const PasswordConfirmation = ({ onConfirm }) => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const handleSignIn = async (e) => {
    e.preventDefault();

    const fcmToken = localStorage.getItem("fcmToken");
    if (!fcmToken) {
      Swal.fire({
        icon: "error",
        title: "알림허용안됨",
        text: "홈화면의 알림아이콘을 터치해주세요",
      });
      return;
    }
    
    const userData = {
      email: email,
      password: password,
      fcmToken: fcmToken,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/api/users/login`,
        userData
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // 응답 로그
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("major", response.data.major);

      navigate("/profile-modification", {
        state: { user: response.data } // 사용자 정보 전달
      });
    } catch (error) {
      // 에러를 처리
      if (error.response) {
        console.error("응답 에러:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "비밀번호를 다시 확인해주세요",
        });
      } else if (error.request) {
        console.error("응답 없음:", error.request);
        Swal.fire({
          icon: "warning",
          title: "응답없음",
          text: error.request,
        });
        navigate("/login");
      } else {
        console.error("요청 설정 에러:", error.message);
        Swal.fire({
          icon: "warning",
          title: "요청 설정 에러",
          text: error.message,
        });
        navigate("/login");
      }
    }
  };

  return (
    <PasswordConfirmContainer>
      <Title>비밀번호 재확인</Title>
      <InputContainer>
        <Label>이메일</Label>
        <Input type="text" placeholder="example@ajou.ac.kr" value={email} readOnly />
      </InputContainer>
      <InputContainer>
        <Label>비밀번호</Label>
        <InputWrapper>
          <Input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TogglePasswordVisibility onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </TogglePasswordVisibility>
        </InputWrapper>
      </InputContainer>
      <Button onClick={handleSignIn}>다음</Button>
    </PasswordConfirmContainer>
  );
};

export default PasswordConfirmation;
