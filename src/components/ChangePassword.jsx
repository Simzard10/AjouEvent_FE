import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Title = styled.h2`
  padding-top: 5%;
  font-size: 1.5em;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;

  span {
    color: #1a73e8;
    font-weight: bold;
  }
`;

const Container = styled.div`
  z-index: 1;
  display: flex;
  padding-top: 3%;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 80%;
  background-color: transparent;
  font-family: "Pretendard Variable";
`;

const Form = styled.form`
  width: 105%;
  margin: 10px auto 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  p {
    font-size: 14px;
    margin: 0.3rem 0 0.1rem 0.5rem;
    font-weight: 600;
  }
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;

  input {
    width: 100%;
    height: 2.5rem;
    padding-left: 10px;
    font-size: 14px;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  background: rgb(0, 102, 179);
  border-radius: 5px;
  color: white;
  font-weight: 600;
  border: none;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background: rgb(0, 90, 150);
  }
`;

const Error = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  color: red;
  padding-left: 10px;
  font-size: 0.8em;
  min-height: 20px; /* 최소 높이를 설정하여 화면 내려가는 현상을 줄임 */
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  position: relative;
  gap: 5px;
  width: 100%;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
`;

const InputLabel = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  flex-grow: 1; 
  white-space : nowrap
`;

const PasswordError = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  color: red;
  padding-left: 20px;
  font-size: 0.8em;
`;

const ChangePasswordPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // 새 필드 추가
  const [passwordError, setPasswordError] = useState("");
  const [passwordValidityError, setPasswordValidityError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const email = state?.email;

  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const validateForm = (password, confirmPassword) => {
    const errors = {};
    if (!password) {
      errors.password = "* 비밀번호를 입력해주세요.";
    } else if (!passwordRegEx.test(password)) {
      setPasswordValidityError("* 비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합하여 8~24자로 입력해야 합니다."); 
    } else {
      setPasswordValidityError("");
    }

    if (password !== confirmPassword) {
      setPasswordError("* 비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }

    return errors;
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (!passwordRegEx.test(e.target.value)) {
      setPasswordValidityError("* 비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합하여 8~24자로 입력해야 합니다.");
    } else {
      setPasswordValidityError("");
    }

    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("* 비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError(""); 
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setPasswordError("* 비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newPassword = e.target.elements.newPassword.value;
    const confirmPassword = e.target.elements.confirmPassword.value;

    const errors = validateForm(newPassword, confirmPassword);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.patch(`${process.env.REACT_APP_BE_URL}/api/users/reset-password`, {
        email,
        newPassword,
      });
      Swal.fire({
        icon: "success",
        title: "비밀번호 재설정 성공",
        text: "비밀번호가 성공적으로 변경되었습니다.",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 재설정 실패",
        text: "비밀번호 재설정에 실패했습니다.",
      });
    }
  };

  return (
    <Container>
      <Title>비밀번호 재설정</Title>
      <Subtitle>
        아이디 <span>{email}</span>의 <br></br>새 비밀번호를 등록해주세요
      </Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <LabelWrapper>
            <InputLabel>새 비밀번호</InputLabel>
            {!newPassword && formErrors.password ? (
              <Error>{formErrors.password}</Error>
            ) : (
              passwordValidityError && <Error>{passwordValidityError}</Error>
            )}
          </LabelWrapper>
          <InputField>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="newPassword"
              placeholder="8~24자 / 영문 대소문자, 숫자, 특수문자 혼합"
              id="newPassword"
              autoComplete="off"
              onChange={handlePasswordChange}
            />
            <span onClick={togglePasswordVisibility}>
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEye : faEyeSlash}
                style={{
                  marginRight: "20px",
                  opacity: "0.5",
                }}
              />
            </span>
          </InputField>
        </InputWrapper>

        <InputWrapper>
          <LabelWrapper>
            <InputLabel>새 비밀번호 확인</InputLabel>
            {passwordError && <PasswordError>{passwordError}</PasswordError>}
          </LabelWrapper>
          <InputField>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="비밀번호 확인"
              className="input"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <span onClick={toggleConfirmPasswordVisibility}>
              <FontAwesomeIcon
                icon={isConfirmPasswordVisible ? faEye : faEyeSlash}
                style={{
                  marginRight: "20px",
                  opacity: "0.5",
                }}
              />
            </span>
          </InputField>
        </InputWrapper>
        <Button type="submit">비밀번호 재설정</Button>
      </Form>
    </Container>
  );
};

export default ChangePasswordPage;