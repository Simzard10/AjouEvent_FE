import styled from "styled-components";

const EventContainer = styled.div`
  display: flex;
  width: 100%;
  height: 220px;
  justify-content: center;
  align-items: center;
  p {
    font-family: "Pretendard Variable";
  }
`;
export default function HomeHotEvent() {
  return (
    <EventContainer>
      <p>불러올 인기글이 없습니다.</p>
    </EventContainer>
  );
}
