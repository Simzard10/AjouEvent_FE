import * as React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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
    link: "/saved",
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

  const handleNavItemClick = (link) => {
    navigate(link);
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
            </NavItem>
          );
        })}
      </NavItems>
    </NavWrapper>
  );
}

export default NavigationBar;
