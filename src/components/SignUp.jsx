import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Container = styled.div`
  z-index: 1;
  display: flex;
  padding-top: 30%;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 60%;
  background-color: transparent;
  font-family: "Pretendard Variable";
`;

const Heading = styled.h1`
  color: #000000;
  font-size: 36px;
  font-weight: 100;
  letter-spacing: -3px;
  text-align: left;
  margin: 0;
`;

const HeadingWapper = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto 0;
`;

const Form = styled.form`
  width: 100%;
  margin: 10px auto 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  p {
    font-size: 14px;
    margin: 0.8rem 0 0.2rem 1rem;
    font-weight: 600;
  }

  .input__block {
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    height: 4rem;
    border-radius: 10px;
    border: solid 1px #cdcdcd;
    padding: 0 6px;
    width: 100%;
    background: rgba(255, 255, 255);

    input {
      display: inline-block;
      width: 90%;
      border: none;
      color: rgba(0, 0, 0);
      padding: 0 0 0 15px;
      font-size: 14px;
      font-family: "Pretendard Variable";

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
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-family: "Pretendard Variable";
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

const Error = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  color: red;
  padding-left: 20px;
  font-size: 0.8em;
`;

const LoadingWrapper = styled.div`
  width: 20%;
  height: full;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingImage = styled.img`
  width: 50%;
  height: 50%;
`;

const Button = styled.button`
  width: 30%;
  background: rgb(0, 102, 179);
  border-radius: 10px;
  color: white;
  font-weight: 600;
  border: none;
  height: 4rem;
  letter-spacing: 0.05em;
  outline: none;
  white-space: pre-wrap;
  text-align: center;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.8)};
  }
`;

const VerificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-family: "Pretendard Variable";
`;

const SignUpButton = styled.button`
  background: rgb(0, 102, 179);
  color: white;
  display: block;
  width: 100%;
  max-width: 680px;
  height: 3rem;
  border-radius: 10px;
  margin: 6px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  font-family: "Pretendard Variable";
  padding: 0 4px;

  &:hover {
    box-shadow: 0 0 0 rgba(233, 30, 99, 0);
  }
`;

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [number, setNumber] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailRequested, setEmailRequested] = useState(false);
  const [emailRequestLoading, setEmailRequestLoading] = useState(false);
  const [email, setEmail] = useState("");
  const emailPattern = /^[^\s@]+@ajou\.ac\.kr$/;

  const validateForm = (name, major, email, password) => {
    const errors = {};
    if (!name) errors.name = "* 이름을 입력해주세요.";
    if (!major) errors.major = "* 학과를 입력해주세요.";
    if (!email) {
      errors.email = "* 아주 G-mail을 입력해주세요.";
    } else if (!emailPattern.test(email)) {
      errors.email = "* 아주 G-mail 형식에 맞지 않습니다.";
    }
    if (!password) errors.password = "* 비밀번호를 입력해주세요.";
    // if (!phone) errors.phone = "* 전화번호를 입력해주세요.";
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const major = e.target.elements.major.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    // const phone = e.target.elements.phone.value;

    const errors = validateForm(name, major, email, password);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BE_URL}/api/users/register`, {
        name,
        major,
        email,
        password,
        // phone,
      });

      Swal.fire({
        icon: "success",
        title: "회원가입 성공",
        text: "회원가입이 완료되었습니다.",
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("응답 에러:", error.response.data);
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: "응답 에러",
        });
      } else if (error.request) {
        console.error("응답 없음:", error.request);
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: "응답 없음",
        });
      } else {
        console.error("요청 설정 에러:", error.message);
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: "요청 설정 에러",
        });
      }
    }
  };

  const emailRequest = async (email) => {
    try {
      setEmailRequestLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/api/users/duplicateEmail?email=${email}`
      );
      const duplicateCheck = response.data;

      if (!duplicateCheck) {
        Swal.fire({
          icon: "error",
          title: "이메일 중복",
          text: "이미 존재하는 이메일입니다.",
        });
        setEmailRequestLoading(false);
      } else {
        setEmailRequested(true);

        try {
          await axios.post(
            `${process.env.REACT_APP_BE_URL}/api/users/emailCheckRequest?email=${email}`
          );

          Swal.fire({
            icon: "success",
            title: "인증번호 전송",
            text: "인증번호 전송이 완료되었습니다.",
          });
        } catch (error) {
          console.error("Error fetching events:", error);
          Swal.fire({
            icon: "error",
            title: "인증번호 전송",
            text: "인증번호 전송 실패",
          });

          setEmailRequestLoading(false);
        } finally {
          setEmailRequestLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      Swal.fire({
        icon: "error",
        title: "이메일 중복 확인 실패",
        text: "요청 설정 에러",
      });
    }
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleEmailCheck = async (email, e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BE_URL}/api/users/emailCheck?email=${email}&code=${number}`
      );

      Swal.fire({
        icon: "success",
        title: "이메일 인증 완료",
        text: "이메일 인증이 완료되었습니다.",
      });
      setEmailCheck(true);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "이메일 인증 실패",
        text: "이메일 인증 실패",
      });
    }
  };

  return (
    <>
      <Container>
        <HeadingWapper>
          <Heading>가입하기</Heading>
        </HeadingWapper>
        <Separator />
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
          {formErrors.name && <Error>{formErrors.name}</Error>}
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
          {formErrors.major && <Error>{formErrors.major}</Error>}

          <InputWrapper>
            <div className="input__block">
              <p>이메일</p>
              <input
                type="email"
                placeholder="아주 G-mail"
                className="input"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailRequestLoading ? (
              <LoadingWrapper>
                <LoadingImage src="Spinner.gif" alt="loading" />
              </LoadingWrapper>
            ) : (
              <Button
                type="button"
                onClick={() => emailRequest(email)}
                disabled={!emailPattern.test(email) || emailCheck}
              >
                {emailRequested ? "재요청" : "인증\n요청"}
              </Button>
            )}
          </InputWrapper>
          {emailRequested && (
            <VerificationWrapper>
              <div className="input__block">
                <p>인증번호</p>
                <input
                  type="text"
                  placeholder="인증번호"
                  className="input"
                  id="email"
                  name="number"
                  onChange={(e) => handleNumberChange(e.target.value)}
                />
              </div>
              {emailCheck ? (
                <div style={{ width: "30%" }}>
                  인증 <br /> 완료
                </div>
              ) : (
                <Button
                  type="button"
                  disabled={!emailRequested || number.length !== 6}
                  onClick={(e) => handleEmailCheck(email, e)}
                >
                  인증
                  <br />
                  확인
                </Button>
              )}
            </VerificationWrapper>
          )}
          {formErrors.email && <Error>{formErrors.email}</Error>}
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
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEye : faEyeSlash}
                  style={{
                    marginRight: "20px",
                    opacity: "0.5",
                  }}
                />
              </span>
            </div>
          </div>
          {formErrors.password && <Error>{formErrors.password}</Error>}
          {/* <div className="input__block">
            <p>전화번호</p>
            <input
              type="text"
              placeholder="010-1234-5678"
              className="input"
              id="phone"
              name="phone"
            />
          </div>
          {formErrors.phone && <Error>{formErrors.phone}</Error>} */}
          <SignUpButton type="submit">가입하기</SignUpButton>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
