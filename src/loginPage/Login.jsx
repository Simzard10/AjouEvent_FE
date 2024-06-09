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
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import GetUserPermission from "../fcm/GetUserPermission";
import Swal from "sweetalert2";

const Container = styled.div`
  z-index: 1;
  display: block;
  padding-top: 8rem;
  height: 100vh;
  background-color: transparent;
  margin: 0;
  font-family: "Pretendard Variable";
`;

const Heading = styled.h1`
  color: #000000;
  font-size: 32px;
  font-weight: 200;
  text-align: left;
  margin: 0 auto 10px 30px;
  font-family: "Pretendard Variable";
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
  max-width: 680px;
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
    width: 90%;
    background: rgba(255, 255, 255);
    border: #6f6f6f solid 1px;
    input {
      display: inline-block;
      width: 80%;
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

const GoogleButton = styled.button`
  display: block;
  width: 90%;
  max-width: 680px;
  margin: 16px auto 0 auto;
  height: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Pretendard Variable";
  border-radius: 30px;
  border: none;
  line-height: 40px;
  background: rgb(222, 222, 222);
  color: #000000;

  .fa {
    font-size: 20px;
    padding: 0 5px 0 0;
  }

  &:hover {
    box-shadow: 0 0 0 rgba(37, 40, 45, 0);
  }
`;

const BottomSignUpWapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 14px;
  p {
    color: black;
    font-size: 1rem;
    margin: 0;
  }
`;

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserPermission();
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
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${redirect_uri_origin}/loginSuccess&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar`;
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
      <Heading>로그인하기</Heading>
      <Separator></Separator>
      <Form onSubmit={handleSignIn}>
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
              placeholder="AJOU G-Mail"
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
          로그인하기
        </button>
      </Form>
      <Separator></Separator>
      <GoogleButton onClick={handleGoogleButtonClicked}>
        <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faGoogle} />
        구글 소셜 LOGIN
      </GoogleButton>
      {/* <div style={{ display: "flex" }}>
        <SignUpStyledLink
          to="/login"
          style={{ marginLeft: "20px" }}
          onClick={() => {
            Swal.fire({
              icon: "question",
              title: "존재하지 않는 페이지입니다",
              text: "기능 개발 중입니다",
            });
          }}
        >
          비밀번호를 잊어버리셨나요?
        </SignUpStyledLink>
      </div> */}
      <Separator></Separator>
      <BottomSignUpWapper>
        <p>
          계정이 없나요? <SignUpStyledLink to="/signUp">가입</SignUpStyledLink>
          하세요.
        </p>
      </BottomSignUpWapper>
    </Container>
  );
};

export default Login;
