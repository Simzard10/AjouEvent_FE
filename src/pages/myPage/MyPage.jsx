import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavigationBar from '../../components/NavigationBar';
import requestWithAccessToken from '../../services/jwt/requestWithAccessToken';
import LocationBar from '../../components/LocationBar';
import Swal from 'sweetalert2';

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
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  font-family: 'Pretendard Variable';
  padding: 20px 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const LogoutBtnWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

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

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding: 20px 0;
`;

const MenuItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 10px 20px;
  font-family: 'Pretendard Variable';
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ArrowIcon = styled.span`
  font-size: 1rem;
  color: gray;
`;

const MyPage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await requestWithAccessToken(
          'get',
          `${process.env.REACT_APP_BE_URL}/api/users`,
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [accessToken, navigate]);

  const handleEditClick = () => {
    navigate('/profile-modification', {
      state: {
        user,
      },
    });
  };

  const handleLogoutBtnClick = () => {
    Swal.fire({
      icon: 'success',
      title: '로그아웃 성공',
      text: '로그아웃 했습니다.',
    });
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('major');
  };

  return (
    <AppContainer>
      <Container>
        <LocationBar location="마이페이지" />
        <UserInfo>
          <h3>회원정보</h3>
          <p>이름: {user.name}</p>
          <p>전공: {user.major}</p>
          <p>이메일: {user.email}</p>
        </UserInfo>

        <MenuList>
          <MenuItem onClick={handleEditClick}>
            회원정보 수정 <ArrowIcon>›</ArrowIcon>
          </MenuItem>
          <MenuItem>
            자주묻는질문 <ArrowIcon>›</ArrowIcon>
          </MenuItem>
          <MenuItem>
            FAQ <ArrowIcon>›</ArrowIcon>
          </MenuItem>
          <MenuItem>
            공지사항 <ArrowIcon>›</ArrowIcon>
          </MenuItem>
          <MenuItem>
            버전 <ArrowIcon>›</ArrowIcon>
          </MenuItem>
        </MenuList>

        <LogoutBtnWapper>
          <StyledLink
            onClick={handleLogoutBtnClick}
            bgcolor={'white'}
            color={'black'}
            to="/login"
          >
            로그아웃
          </StyledLink>
        </LogoutBtnWapper>
      </Container>
      <NavigationBar />
    </AppContainer>
  );
};

export default MyPage;
