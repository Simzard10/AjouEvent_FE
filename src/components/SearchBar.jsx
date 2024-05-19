import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../icons/SearchIcon";

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
  width: 90%;
  height: 36px;
  flex-direction: row;
  justify-content: center;
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
`;

const SearchBar = ({ keyword, setKeyword }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // 예시로 console.log를 사용했지만, 실제로는 검색 API 호출 등의 로직을 추가하면 됩니다.
    console.log(`Searching "${keyword}" on ${keyword} page`);

    // 검색어 부모 컴포넌트에 검색어 전달
    setKeyword(searchTerm);
  };

  return (
    <Container>
      <InputContentContainer>
        <InputBox
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력해 주세요"
        />
        <SearchIcon onClick={handleSearch}></SearchIcon>
      </InputContentContainer>
    </Container>
  );
};

export default SearchBar;
