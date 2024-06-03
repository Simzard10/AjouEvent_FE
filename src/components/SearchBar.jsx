import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../icons/SearchIcon";
import useStore from "../store/useStore";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
`;

const InputContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 36px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(229, 232, 235, 1);
  border-radius: 50px;
`;

const InputBox = styled.input`
  display: flex;
  width: 84%;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border: none;
  outline: none;
  font-family: "Spoqa Han Sans Neo";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.98px;
  margin-left: 16px;
`;

const IconWapper = styled.div`
  margin-right: 16px;
  padding-top: 4px;
  cursor: pointer;
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setKeyword } = useStore((state) => ({
    setKeyword: state.setKeyword,
  }));

  const handleSearchClick = () => {
    setKeyword(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Container>
      <InputContentContainer>
        <InputBox
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력해 주세요"
        />
        <IconWapper onClick={handleSearchClick}>
          <SearchIcon />
        </IconWapper>
      </InputContentContainer>
    </Container>
  );
};

export default SearchBar;
