import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import styled from 'styled-components';
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ProfileContainer = styled.div`
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
  width: 100%;
`;

const Label = styled.label`
  font-family: "Pretendard Variable";
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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
  margin-left: 10px;

  &:hover {
    background-color: #333;
  }
`;

const PasswordChangeSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Separator = styled.div`
  display: block;
  margin: 10px auto 10px;
  text-align: center;
  height: 10px;
  position: relative;
  background: transparent;
  color: rgba(255, 255, 255);
  width: 95%;
  max-width: 680px;

  &::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 0;
    background: rgba(120, 120, 120, 0.5);
    height: 1px;
    width: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 8px;
    right: 0;
    background: rgba(120, 120, 120, 0.5);
    height: 1px;
    width: 50%;
  }
`;

const Heading = styled.h1`
  color: #000000;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
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
  white-space: nowrap;
`;

const DeleteAccountLink = styled.span`
  font-family: "Pretendard Variable";
  color: #0066b3;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    color: #333;
  }
`;

const PasswordError = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  color: red;
  padding-left: 20px;
  font-size: 0.8em;
`;

const ProfileModification = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordValidityError, setPasswordValidityError] = useState('');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  const user = state?.user;
  const email = user?.email;

  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const validatePassword = (password) => {
    if (!passwordRegEx.test(password)) {
      return "* 비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합하여 8~24자로 입력해야 합니다.";
    }
    return '';
  };

  const validateForm = (password, confirmPassword) => {
    const validityError = validatePassword(password);
    setPasswordValidityError(validityError);

    if (validityError) {
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError("* 비밀번호가 일치하지 않습니다.");
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const validateCurrentPassword = async () => {
    try {
      await requestWithAccessToken(
        "post",
        `${process.env.REACT_APP_BE_URL}/api/users/verify-current-password`,
        { currentPassword: currentPassword }
      );
      setCurrentPasswordError('');
      return true;
    } catch (error) {
      setCurrentPasswordError("현재 비밀번호를 정확히 입력하세요");
      Swal.fire({
        icon: "error",
        title: "비밀번호 변경 실패",
        text: "현재 비밀번호를 정확히 입력하세요.",
      });
      return false;
    }
  };

  useEffect(() => {
    validateForm(newPassword, confirmPassword);
  }, [newPassword, confirmPassword]);

  const handleUpdate = async () => {
    if (!validateForm(newPassword, confirmPassword)) return;

    const isCurrentPasswordValid = await validateCurrentPassword();
    if (!isCurrentPasswordValid) return;
    
    try {
      await requestWithAccessToken(
        "patch",
        `${process.env.REACT_APP_BE_URL}/api/users/change-password`,
        { password: currentPassword, newPassword }
      );
      Swal.fire({
        icon: "success",
        title: "비밀번호 변경 성공",
        text: "비밀번호가 성공적으로 변경되었습니다.",
      }).then(() => {
        navigate("/login"); // 비밀번호 변경 성공 후 로그인 페이지로 이동
      });
      setIsEditing(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 변경 실패",
        text: "비밀번호 변경 중 문제가 발생했습니다.",
      });
    }
  };

  const handleDeleteAccount = () => {
    navigate("/delete-account");  // "회원 탈퇴하기" 클릭 시 DeleteAccountPage로 이동
  };

  return (
    <ProfileContainer>
      <Title>회원정보 수정</Title>
      <Separator></Separator>
      <Heading>로그인 정보</Heading>
      <InputContainer>
        <InputLabel>아이디 (이메일)</InputLabel>
        <Input type="text" value={email} readOnly />
      </InputContainer>

      <InputContainer>
        <InputLabel>비밀번호</InputLabel>
        <InputRow>
          <Input type="password" value="********" readOnly />
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? '변경 취소' : '변경'}
          </Button>
        </InputRow>
      </InputContainer>

      {isEditing && (
        <PasswordChangeSection>
          <InputContainer>
            <InputLabel>현재 비밀번호</InputLabel>
            <InputWrapper>
              <Input
                type={isCurrentPasswordVisible ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력하세요"
              />
              <TogglePasswordVisibility onClick={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}>
                {isCurrentPasswordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </TogglePasswordVisibility>
            </InputWrapper>
          </InputContainer>

          <InputContainer>
            <LabelWrapper>
              <InputLabel>새 비밀번호</InputLabel>
              {passwordValidityError && <PasswordError>{passwordValidityError}</PasswordError>}
            </LabelWrapper>
            <InputWrapper>
              <Input
                type={isNewPasswordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력하세요"
              />
              <TogglePasswordVisibility onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                {isNewPasswordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </TogglePasswordVisibility>
            </InputWrapper>
          </InputContainer>

          <InputContainer>
            <LabelWrapper>
              <InputLabel>새 비밀번호 확인</InputLabel>
              {passwordError && <PasswordError>{passwordError}</PasswordError>}
            </LabelWrapper>
            <InputWrapper>
              <Input
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
              />
              <TogglePasswordVisibility onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                {isConfirmPasswordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </TogglePasswordVisibility>
            </InputWrapper>
            
          </InputContainer>

          <Button onClick={handleUpdate}>비밀번호 변경</Button>
        </PasswordChangeSection>
      )}

      <DeleteAccountLink onClick={handleDeleteAccount}>회원 탈퇴하기</DeleteAccountLink>
    </ProfileContainer>
  );
};

export default ProfileModification;