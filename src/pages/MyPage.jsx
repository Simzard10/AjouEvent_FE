import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";
import LocationBar from "../components/LocationBar";
import Swal from "sweetalert2";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100vh;
  overflow-y: hidden;
  width: 100vw;
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const UserInfo = styled.div`
  display: flex;
  height: calc(100vh - 420px);
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-family: "Pretendard Variable";
  padding: 40px 40px 10px 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const Button = styled.button`
  width: 50%;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  padding: 10px 20px;
  font-family: "Pretendard Variable";
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 30px 0 30px;
  margin-bottom: 20px;
`;

const LogoutBtnWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  width: 300px;
  gap: 12px;
`;

const ModalTitle = styled.h1`
  margin: 0;
  font-family: "Montserrat", sans-serif;
`;

const Input = styled.input`
  height: 2rem;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const InputTitle = styled.p`
  margin: 0;
  font-family: "Montserrat", sans-serif;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 0;
`;

// 임시 로그아웃 버튼
const StyledLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgcolor};
  border-radius: 0.5rem;
  border: 1px solid gray;
  width: 6rem;
  height: 1.4rem;
  color: ${(props) => props.color};
  font-size: 0.8rem;
  text-decoration: none;
  margin: 0 1rem 0 1rem;
`;

const MyPage = () => {
  const [user, setUser] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    major: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return;
    const fetchUserInfo = async () => {
      try {
        const response = await requestWithAccessToken(
          "get",
          `${process.env.REACT_APP_BE_URL}/api/users`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editForm.name.trim()) newErrors.name = "이름을 입력해주세요.";
    if (!editForm.major.trim()) newErrors.major = "전공을 입력해주세요.";
    if (!editForm.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[a-zA-Z0-9._%+-]+@ajou\.ac\.kr$/.test(editForm.email)) {
      newErrors.email = "유효한 아주대학교 이메일을 입력해주세요.";
    }
    if (!editForm.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요.";
    } else if (!/^010-\d{4}-\d{4}$/.test(editForm.phone)) {
      newErrors.phone = "전화번호 형식이 유효하지 않습니다. (010-0000-0000)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await requestWithAccessToken(
        "patch",
        `${process.env.REACT_APP_BE_URL}/api/users`,
        editForm
      );
      Swal.fire({
        icon: "success",
        title: "정보수정 성공",
        text: response.data.message,
      });
      setUser(editForm);
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await requestWithAccessToken(
        "delete",
        `${process.env.REACT_APP_BE_URL}/api/users`
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "회원 탈퇴 성공",
          text: "회원 탈퇴했습니다.",
        });
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  //임시 로그아웃
  const handleLogoutBtnClick = () => {
    Swal.fire({
      icon: "success",
      title: "로그아웃 성공",
      text: "로그아웃 했습니다.",
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("major");
  };

  return (
    <AppContainer>
      {accessToken ? (
        <Container>
          <LocationBar location="마이페이지" />
          <UserInfo>
            <h3>회원정보</h3>
            <p>이름: {user.name}</p>
            <p>전공: {user.major}</p>
            <p>이메일: {user.email}</p>
            <p>전화번호: {user.phone}</p>
          </UserInfo>

          <ButtonContainer>
            <Button
              onClick={() => {
                setEditForm(user);
                setErrors({});
                setEditModalOpen(true);
              }}
            >
              정보수정
            </Button>
            <Button onClick={() => setDeleteModalOpen(true)}>회원탈퇴</Button>
          </ButtonContainer>
          <LogoutBtnWapper>
            <StyledLink
              onClick={handleLogoutBtnClick}
              bgcolor={"white"}
              color={"black"}
              to="/signIn"
            >
              로그아웃
            </StyledLink>
          </LogoutBtnWapper>

          {editModalOpen && (
            <ModalBackground>
              <Modal>
                <ModalTitle>정보수정</ModalTitle>
                <InputTitle>이름</InputTitle>
                <Input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="이름"
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
                <InputTitle>전공</InputTitle>
                <Input
                  type="text"
                  name="major"
                  value={editForm.major}
                  onChange={handleEditChange}
                  placeholder="전공"
                />
                {errors.major && <ErrorText>{errors.major}</ErrorText>}
                <InputTitle>이메일</InputTitle>
                <Input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="이메일"
                />
                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                <InputTitle>전화번호</InputTitle>
                <Input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  placeholder="전화번호"
                />
                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                <ButtonContainer>
                  <Button onClick={handleEditSubmit}>수정완료</Button>
                  <Button onClick={() => setEditModalOpen(false)}>닫기</Button>
                </ButtonContainer>
              </Modal>
            </ModalBackground>
          )}

          {deleteModalOpen && (
            <ModalBackground>
              <Modal>
                <h2>회원탈퇴</h2>
                <p>탈퇴하시겠습니까?</p>
                <Button onClick={handleDeleteAccount}>확인</Button>
                <Button onClick={() => setDeleteModalOpen(false)}>취소</Button>
              </Modal>
            </ModalBackground>
          )}
        </Container>
      ) : (
        <>
          <p>로그인이 필요한 서비스입니다</p>
          <StyledLink bgcolor={"white"} color={"black"} to="/signIn">
            로그인
          </StyledLink>
        </>
      )}
      <NavigationBar />
    </AppContainer>
  );
};

export default MyPage;
