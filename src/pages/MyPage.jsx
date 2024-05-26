import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import TopBar from "../components/TopBar";
import BottomNavbar from "../components/BottomNavbar";

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
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BE_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (accessToken) {
      fetchUserInfo();
    }
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
      const response = await axios.patch(
        `${process.env.REACT_APP_BE_URL}/api/users`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert(response.data.message);
      setUser(editForm);
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BE_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        alert("탈퇴가 완료되었습니다.");
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContainer>
      <TopBar />
      {accessToken ? (
        <Container>
          <UserInfo>
            <h1>마이페이지</h1>
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
        <p>로그인이 필요한 서비스입니다</p>
      )}
      <BottomNavbar />
    </AppContainer>
  );
};

export default MyPage;
