import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import requestWithAccessToken from "../JWTToken/requestWithAccessToken";

const NavWrapper = styled.nav`
  z-index: 5;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  flex-direction: column;
  font-size: 12px;
  color: #b8bfc6;
  font-weight: 700;
  text-align: center;
  line-height: 150%;
  padding: 12px 0px 20px;
`;

const NavItems = styled.ul`
  display: flex;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 14px;
  align-items: center;
  color: ${(props) => (props.active ? "#2366af" : "#b8bfc6")};
  cursor: pointer;
  position: relative;
`;

const NavIcon = styled.img`
  width: 24px;
  aspect-ratio: 1;
  object-fit: cover;
  filter: ${(props) => (props.active ? "none" : "grayscale(100%)")};
`;

const NavLabel = styled.span`
  margin-top: 4px;
  color: inherit;
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
`;

const items = [
  {
    srcFilled: `${process.env.PUBLIC_URL}/icons/home.svg`,
    srcEmpty: `${process.env.PUBLIC_URL}/icons/home_border.svg`,
    label: "홈",
    alt: "Home",
    link: "/",
  },
  {
    srcFilled: `${process.env.PUBLIC_URL}/icons/search.svg`,
    srcEmpty: `${process.env.PUBLIC_URL}/icons/search_border.svg`,
    label: "검색",
    alt: "Search",
    link: "/event",
  },
  {
    srcFilled: `${process.env.PUBLIC_URL}/icons/favorite.svg`,
    srcEmpty: `${process.env.PUBLIC_URL}/icons/favorite_border.svg`,
    label: "찜",
    alt: "Favorites",
    link: "/liked",
  },
  {
    srcFilled: `${process.env.PUBLIC_URL}/icons/subscriptions.svg`,
    srcEmpty: `${process.env.PUBLIC_URL}/icons/subscriptions_border.svg`,
    label: "구독",
    alt: "Subscription",
    link: "/subscribe",
  },
  {
    srcFilled: `${process.env.PUBLIC_URL}/icons/identity.svg`,
    srcEmpty: `${process.env.PUBLIC_URL}/icons/identity_border.svg`,
    label: "프로필",
    alt: "Profile",
    link: "/mypage",
  },
];



function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // 전역 상태에서 읽음 상태 관리 (서버 변수명 그대로 사용)
  const {
    // isSubscribedTabRead,
    isTopicTabRead,
    isKeywordTabRead,
    setIsSubscribedTabRead,
    setIsTopicTabRead,
    setIsKeywordTabRead,
  } = useStore();

  const handleNavItemClick = (link) => {
    navigate(link);
    fetchMemberStatus();
  };

  const fetchMemberStatus = async () => {
    try {
      const response = await requestWithAccessToken(
        "get",
        `${process.env.REACT_APP_BE_URL}/api/event/readStatus`
      );

      console.log("readStatus 서버 응답:", response.data);
      setIsTopicTabRead(response.data.isTopicTabRead);
      setIsKeywordTabRead(response.data.isKeywordTabRead);

      // 구독 탭의 뱃지는 토픽과 키워드 알림이 모두 읽혔을 때만 제거
      if (!response.data.isTopicTabRead || !response.data.isKeywordTabRead) {
        setIsSubscribedTabRead(false); // 둘 중 하나라도 읽지 않음 상태라면 구독 탭 뱃지 표시
      } else {
        setIsSubscribedTabRead(true); // 둘 다 읽음 상태면 구독 탭 뱃지 제거
      }
    } catch (error) {
      console.error("사용자 읽음 상태 불러오기 오류:", error);
    }
  };

return (
    <NavWrapper>
      <NavItems>
        {items.map((item, index) => {
          const isActive = currentPath === item.link;
          return (
            <NavItem
              key={index}
              active={isActive}
              onClick={() => handleNavItemClick(item.link)}
            >
              <NavIcon
                src={isActive ? item.srcFilled : item.srcEmpty}
                alt={item.alt}
                active={isActive}
              />
              <NavLabel>{item.label}</NavLabel>
              {/* 구독 탭에 뱃지 표시 */}
              {console.log("상태 isTopicTabRead: ", isTopicTabRead)}
              {console.log("상태 isKeywordTabRead: ", isKeywordTabRead)}
              {item.label === "구독" && (!isTopicTabRead || !isKeywordTabRead)  && <Badge />}
            </NavItem>
          );
        })}
      </NavItems>
    </NavWrapper>
  );
}

export default NavigationBar;
