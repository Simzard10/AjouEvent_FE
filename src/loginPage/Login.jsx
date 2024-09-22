import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faLock,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FcGoogle } from "react-icons/fc";
import GetUserPermission from "../fcm/GetUserPermission";
import Swal from "sweetalert2";

const Container = styled.div`
  z-index: 1;
  display: block;
  padding-top: 8rem;
  width: 90%;
  height: 100vh;
  background-color: transparent;
  margin: 0;
  font-family: "Pretendard Variable";
`;

const Heading = styled.h1`
  color: #000000;
  font-size: 32px;
  font-weight: 200;
  margin: 0;
  text-align: left;
  font-family: "Pretendard Variable";
`;
const HeadingWapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 680px;
  align-items: start;
  justify-content: baseline;
  padding-left: 1rem;
`;

const SignUpStyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: rgb(0, 102, 179);
  border-bottom: solid white 1px;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  margin: 10px auto 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .input__block {
    display: flex;
    align-items: center;
    margin: 5px;
    position: relative;
    max-width: 680px;
    height: 50px;
    border-radius: 30px;
    width: 100%;
    background: rgba(255, 255, 255);
    border: #6f6f6f solid 1px;
    input {
      display: inline-block;
      width: 100%;
      border: none;
      color: rgba(0, 0, 0);
      padding: 0 0 0 15px;
      font-size: 1rem;
      font-family: "Pretendard Variable";

      &:focus,
      &:active {
        outline: none;
        border: none;
      }
    }
  }

  .signin__btn {
    background: rgb(0, 102, 179);
    color: white;
    display: block;
    width: 92.5%;
    max-width: 680px;
    height: 50px;
    border-radius: 30px;
    margin: 10px auto 0 auto;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: "Pretendard Variable";
    transition: 0.2s linear;

    &:hover {
      box-shadow: 0 0 0 rgba(233, 30, 99, 0);
    }
  }
`;

const Separator = styled.div`
  display: block;
  margin: 10px auto 10px;
  max-width: 680px;
  text-align: center;
  height: 10px;
  position: relative;
  background: transparent;
  color: rgba(255, 255, 255);
  width: 90%;
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

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 680px;
  height: 50px;
  margin: 16px auto 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1); // 테두리 색상 설정
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding-left: 8px; // 왼쪽 여백 8dp
  padding-right: 8px; // 오른쪽 여백 8dp

  &:hover {
    background-color: #f0f0f0;
  }

  .icon {
    width: 18px; // 로고 크기
    height: 18px;
    margin-right: 24px; // 로고와 텍스트 사이 간격 24dp
  }

  span {
    text-align: center;
    color: #000000;
    color: rgba(0, 0, 0, 0.54); // 폰트 컬러 54% 투명도
    font-size: 14px;
    font-family: "Roboto", system-ui;
    font-weight: 500;
    font-style: normal;
  }
`;


const BottomLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #6f6f6f;

  a {
    color: #6f6f6f;
    text-decoration: none;
    padding: 0 10px;
  }

  span {
    padding: 0 10px;
  }
`;

const Description = styled.p`
  color: #999999;
  margin: 40px 0 20px 0;
  font-size: 14px;
  width: 100%;
  text-align: center;
  line-height: 1.8;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  z-index: 1000;
`;

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserPermission(setIsLoading);
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleGoogleButtonClicked = () => {
    const fcmToken = localStorage.getItem("fcmToken");
    if (!fcmToken) {
      Swal.fire({
        icon: "error",
        title: "알림허용안됨",
        text: "홈화면의 알림아이콘을 터치해주세요",
      });
      return;
    }
    const redirect_uri_origin = window.location.origin;
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${redirect_uri_origin}/loginSuccess&response_type=code&prompt=consent&access_type=offline&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar&hd=ajou.ac.kr`;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
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
      Swal.fire({
        icon: "success",
        title: "로그인 성공",
        text: `${response.data.name}님 환영합니다!`,
      });
      navigate("/");
    } catch (error) {
      // 에러를 처리
      if (error.response) {
        console.error("응답 에러:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "이메일과 비밀번호를 다시 확인해주세요",
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
    <Container>
      {isLoading && <LoadingOverlay>알림 서비스 등록 중 ...</LoadingOverlay>}

      <Form onSubmit={handleSignIn}>
        <HeadingWapper>
          <Heading>로그인</Heading>
          
        </HeadingWapper>

        <Separator></Separator>
        <div className="input__block">
          <FontAwesomeIcon
            style={{
              marginLeft: "20px",
              paddingRight: "20px",
              borderRight: "solid 1px black",
            }}
            icon={faUser}
          />
          <div className="signup-input__block">
            <input
              type="email"
              placeholder="example@ajou.ac.kr"
              className="input"
              id="email"
              name="email"
            />
          </div>
        </div>
        <div className="input__block">
          <FontAwesomeIcon
            style={{
              marginLeft: "20px",
              paddingRight: "20px",
              borderRight: "solid 1px black",
            }}
            icon={faLock}
          />

          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="비밀번호"
            id="password"
            autoComplete="off"
          />
          <span onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <FontAwesomeIcon
                style={{
                  marginRight: "20px",
                  opacity: "0.5",
                }}
                icon={faEye}
              />
            ) : (
              <FontAwesomeIcon
                style={{
                  marginRight: "20px",
                  opacity: "0.5",
                }}
                icon={faEyeSlash}
              />
            )}
          </span>
        </div>

        <button type="submit" className="signin__btn">
          로그인
        </button>
      </Form>
      <GoogleLoginButton onClick={handleGoogleButtonClicked}>
        <FcGoogle className="icon" />
        <span>Google 계정으로 로그인</span>
      </GoogleLoginButton>
      <Separator></Separator>
      <BottomLinks>
        <Link to="/privacy-agreement">회원가입</Link>
        <span>|</span>
        <Link to="/findPassword">비밀번호 찾기</Link>
      </BottomLinks>
      <Description>
        * AjouEvent는 2024-1학기 아주대학교 파란학기제에서<br />
        진행한 프로젝트로 아주대학교 공식 서비스가 아닙니다. <br />
        * AjouEvent 계정은 아주대학교 포탈 계정과 무관합니다. <br />
        서비스 문의: jysim0326@ajou.ac.kr
      </Description>
    </Container>
  );
};

export default Login;
