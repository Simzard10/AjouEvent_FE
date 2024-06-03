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
  font-family: Pretendard, sans-serif;
  margin-top: 4px;
  color: inherit;
`;

const items = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/65b56a4ffab3eaa5c2257bc21a5c42a41a0e9ca47ce63833161b6dc806ff4604?apiKey=75213697ab8e4fbfb70997e546d69efb&",
    label: "홈",
    alt: "Home",
    link: "/",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1e4e40f579f73dcf67b2eed4c4b6944eca78dbaf9d8e1019a87798819f47592?apiKey=75213697ab8e4fbfb70997e546d69efb&",
    label: "검색",
    alt: "Search",
    link: "/event",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f32ce869bb5a19fb83ac5434715240ae8833682f5835fbab69c7b800946b343?apiKey=75213697ab8e4fbfb70997e546d69efb&",
    label: "찜",
    alt: "Favorites",
    link: "/saved",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5996827d8707e18e131d0d379bcd2b0f2f3d3618dcfa4d3298484dfad45153e1?apiKey=75213697ab8e4fbfb70997e546d69efb&",
    label: "구독",
    alt: "Subscription",
    link: "/subscribe",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc35a670980ff79ed9d05736916c2d15ebb12d76210915fc47d0aa4e5e58ea97?apiKey=75213697ab8e4fbfb70997e546d69efb&",
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
              <NavIcon src={item.src} alt={item.alt} active={isActive} />
              <NavLabel>{item.label}</NavLabel>
            </NavItem>
          );
        })}
      </NavItems>
    </NavWrapper>
  );
}

export default NavigationBar;
