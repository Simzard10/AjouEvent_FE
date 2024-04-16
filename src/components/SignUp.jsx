import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  z-index: 1;
  display: block;
  padding-top: 100px;
  height: 100vh;
  width: 60%;
  background-color: transparent;
`;

const Heading = styled.h1`
  color: #000000;
  font-size: 36px;
  font-weight: 100;
  letter-spacing: -3px;
  text-align: left;
  margin: 0;
`;

const Form = styled.form`
  width: 100%;
  max-width: 680px;
  margin: 10px auto 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 14px;
    margin: 0.8rem 0 0.2rem 1rem;
  }
  .input__block {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 5px;
    position: relative;
    max-width: 680px;
    height: 4rem;
    border-radius: 10px;
    border: solid 1px #cdcdcd;
    padding: 0 6px;
    width: 90%;
    background: rgba(255, 255, 255);
    input {
      display: inline-block;
      width: 90%;
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

  .pw-input__block {
    display: flex;
    width: 100%;
  }
  .hf-input__block {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .signin__btn {
    background: rgb(0, 102, 179);
    color: white;
    display: block;
    width: 96%;
    max-width: 680px;
    height: 4rem;
    border-radius: 10px;
    margin: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
    padding: 0 4px;

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

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const major = e.target.elements.major.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const phone = e.target.elements.phone.value;

    try {
      // 서버에 회원가입 요청 보내기
      const response = await axios.post(
        "https://ajou-event.shop/users/register",
        {
          name,
          major,
          email,
          password,
          phone,
        }
      );

      // 응답 로그
      console.log("응답:", response.data);
      alert("회원가입이 완료되었습니다!");
      navigate("/signIn");
    } catch (error) {
      // 에러를 처리
      if (error.response) {
        console.error("응답 에러:", error.response.data);
      } else if (error.request) {
        console.error("응답 없음:", error.request);
      } else {
        console.error("요청 설정 에러:", error.message);
      }
    }
  };

  return (
    <>
      <Container>
        <Heading>가입하기</Heading>
        <Separator></Separator>
        <Form onSubmit={handleSignUp}>
          <div className="input__block">
            <p>이름</p>
            <input
              type="text"
              placeholder="이름"
              className="input"
              id="name"
              name="name"
            />
          </div>
          <div className="input__block">
            <p>학과</p>
            <input
              type="text"
              placeholder="학과"
              className="input"
              id="major"
              name="major"
            />
          </div>
          <div className="input__block">
            <p>이메일</p>
            <input
              type="email"
              placeholder="5 ~ 12자"
              className="input"
              id="email"
              name="userName"
            />
          </div>
          <div className="input__block">
            <p>비밀번호</p>
            <div className="pw-input__block">
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
          </div>
          <div className="input__block">
            <p>전화번호</p>
            <input
              type="text"
              placeholder="010-1234-5678"
              className="input"
              id="phone"
              name="phone"
            />
          </div>
          <button type="submit" className="signin__btn">
            가입하기
          </button>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
