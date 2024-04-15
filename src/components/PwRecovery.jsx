import React, { useState } from "react";
import styled from "styled-components";
import ConsentPersonalInfo from "./ConsentPersonalInfo";
const Container = styled.div`
  position: relative;
  top: 5rem;
  z-index: 1;
  display: block;
  max-width: 400px;
  padding-top: 100px;
  height: 100vh;
  width: 60%;
  background-color: transparent;
`;

const Heading = styled.h1`
  color: #ffffff;
  font-size: 36px;
  font-weight: 100;
  letter-spacing: -3px;
  text-align: left;
  margin: 0 0 0 20px;
  transition: 0.2s linear;
  p {
    font-size: 12px;
    letter-spacing: 0px;
  }
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
    border-radius: 20px;
    padding: 0 1rem 0 1rem;
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
    background: #3d1959;
    color: white;
    display: block;
    width: 92.5%;
    max-width: 680px;
    height: 50px;
    border-radius: 35px;
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
  width: 100%;
  max-width: 680px;

  &::before {
    content: "";
    position: absolute;
    top: 8px;
    left: 0;
    background: rgba(255, 255, 255, 0.5);
    height: 1px;
    width: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 8px;
    right: 0;
    background: rgba(255, 255, 255, 0.5);
    height: 1px;
    width: 50%;
  }
`;

const KakaoButton = styled.button`
  display: block;
  width: 90%;
  max-width: 680px;
  margin: 10px auto 0 auto;
  height: 50px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  border-radius: 20px;
  border: none;
  line-height: 40px;
  background: rgb(247, 228, 0);
  color: #000000;

  .fa {
    font-size: 20px;
    padding: 0 5px 0 0;
  }

  &:hover {
    box-shadow: 0 0 0 rgba(37, 40, 45, 0);
  }
`;

const AuthButton = styled.button`
  display: block;
  width: 20%;
  max-width: 680px;
  margin: 5px auto 5px auto;
  height: inherit;
  cursor: pointer;
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
  border-radius: 20px;
  border: none;
  line-height: auto;
  background: #3d1959;
  color: #ffffff;
  white-space: normal;

  .fa {
    font-size: 20px;
    padding: 0 5px 0 0;
  }

  &:hover {
    box-shadow: 0 0 0 rgba(37, 40, 45, 0);
  }
`;

const PwRecovery = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <Container>
        <Heading>
          비밀번호를 <br></br>잊어버리셨나요?
          <p>
            사용자의 MARIAJEU 이메일 주소를 입력하여 비밀번호를 재설정하세요.
          </p>
        </Heading>

        <Separator></Separator>
        <Form action="" method="post">
          <div className="hf-input__block">
            <div className="input__block ">
              <p>이메일</p>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                className="input"
                id="email"
                name="email"
                onChange={handleEmailChange}
              />
            </div>

            <AuthButton>
              인증<br></br>요청
            </AuthButton>
          </div>
          <div className="hf-input__block">
            <div className="input__block ">
              <p>인증 번호 입력</p>
              <input
                type="text"
                className="input"
                placeholder="O O O O O O"
                id="authNum"
              />
            </div>
          </div>
          <Separator></Separator>
          <button className="signin__btn">비밀번호 재설정하기</button>
        </Form>
      </Container>
    </>
  );
};

export default PwRecovery;
