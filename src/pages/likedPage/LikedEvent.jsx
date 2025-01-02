import styled from 'styled-components';
import EventCard from '../../components/events/EventCard';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px 0 20px;
`;

const LikedEvent = ({ events, bottomRef, loading, hasMore }) => {
  return (
    <>
      <FlexContainer>
        {events.map((event, index) => (
          <EventCard
            key={`${event.eventId}-${index}`}
            id={event.eventId}
            title={event.title}
            subject={event.subject}
            content={event.content}
            imgUrl={event.imgUrl}
            likesCount={event.likesCount}
            viewCount={event.viewCount}
            star={event.star}
          />
        ))}
      </FlexContainer>
      <div ref={bottomRef} style={{ height: '1px' }}></div>
      {loading && <p>로딩중...</p>}
      {!hasMore && <p>불러올 이벤트가 없습니다.</p>}
    </>
  );
};

export default LikedEvent;
