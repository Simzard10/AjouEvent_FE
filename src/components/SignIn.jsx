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
import useStore from "../store/useStore";
import GetUserPermission from "../fcm/GetUserPermission";

const Container = styled.div`
  z-index: 1;
  display: block;
  padding-top: 8rem;
  height: 100vh;
  background-color: transparent;
  margin: 0;
`;

const Heading = styled.h1`
  color: #000000;
  font-size: 32px;
  font-weight: 100;
  letter-spacing: -3px;
  text-align: left;
  margin: 0 0 0 20px;
  transition: 0.2s linear;
`;

const SignUpStyledLink = styled(Link)`
  text-decoration: none;
  font-size: 0.7rem;
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
      font-size: 14px;
      font-family: "Montserrat", sans-serif;

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
    margin: 0 auto;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
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
  margin: 10px auto 0 auto;
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
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
const CheckBoxContainer = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 0.8rem;
  user-select: none;
`;

const StyledCheckBox = styled.input`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  border: 2px solid #999;
  appearance: none;
  cursor: pointer;
  &:checked {
    background: #701edb;
  }
`;

const BottomSignUpWapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding-right: 14px;
  p {
    color: black;
    font-size: 0.6rem;
    margin: 0;
  }
`;
const SignIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { id, name, major, setId, setName, setMajor } = useStore();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleGoogleButtonClicked = () => {
    alert("기능개발중입니다.");
  };

  useEffect(() => {
    // const checkAndSendToken = async () => {
    //   try {
    //     console.log("Checking notification permission...");
    //     const permission = await Notification.requestPermission();
    //     if (permission === "granted") {
    //       console.log(
    //         "Notification permission granted. Ready to send token..."
    //       );
    //       await sendTokenToServer();
    //     } else {
    //       console.log(
    //         "Notification permission not granted. Requesting permission..."
    //       );
    //     }
    //   } catch (error) {
    //     console.error(
    //       "Failed to check or request notification permission:",
    //       error
    //     );
    //   }
    // };

    // checkAndSendToken();
    GetUserPermission();
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const fcmToken = localStorage.getItem("fcmToken");
    console.log(fcmToken);

    const userData = {
      email: email,
      password: password,
      fcmToken: fcmToken,
    };

    try {
      const response = await axios.post(
        "https://ajou-event.shop/users/login",
        userData
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      if (document.getElementById("maintainSignIn").checked) {
        document.cookie = `longLivedToken=${
          response.data.accessToken
        }; max-age=${365 * 24 * 60 * 60}; path=/;`;
      }

      // 응답 로그
      console.log("응답:", response.data);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("major", response.data.major);
      setId(response.data.id);
      setName(response.data.name);
      setMajor(response.data.major);

      alert("로그인이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      // 에러를 처리
      if (error.response) {
        console.error("응답 에러:", error.response.data);
        navigate("/");
      } else if (error.request) {
        console.error("응답 없음:", error.request);
        navigate("/");
      } else {
        console.error("요청 설정 에러:", error.message);
        alert(error.message);
        navigate("/");
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const savedId = getCookie("savedId");
    if (savedId) {
      document.getElementById("email").value = savedId;
    }
  });

  // 쿠키에서 특정 이름의 쿠키 값을 가져오는 함수
  function getCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  return (
    <Container>
      <Heading>로그인하기</Heading>
      <GoogleButton onClick={handleGoogleButtonClicked}>
        <FontAwesomeIcon style={{ marginRight: "10px" }} icon={faGoogle} />
        구글 소셜 LOGIN
      </GoogleButton>
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
        <CheckBoxContainer>
          <StyledCheckBox type="checkbox" id="maintainSignIn"></StyledCheckBox>
          <label
            htmlFor="maintainSignIn"
            style={{ color: "black", marginRight: "16px" }}
          >
            로그인 상태 유지
          </label>

          <StyledCheckBox type="checkbox" id="saveId"></StyledCheckBox>
          <label htmlFor="saveId" style={{ color: "black" }}>
            ID 기억하기
          </label>
        </CheckBoxContainer>

        <Separator></Separator>
        <button type="submit" className="signin__btn">
          로그인하기
        </button>
      </Form>
      <div style={{ display: "flex" }}>
        <SignUpStyledLink to="/" style={{ marginLeft: "20px" }}>
          비밀번호를 잊어버리셨나요?
        </SignUpStyledLink>
      </div>
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

export default SignIn;
