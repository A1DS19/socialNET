import React, { Fragment } from 'react';
import { EventListItem } from './EventListItem';
import { EventData } from '../../../actions/event';
import InfiniteScroll from 'react-infinite-scroller';

interface EventListProps {
  events: EventData[];
  getNextEvents: () => void;
  loading: boolean;
  moreEvents: boolean;
}

const EventList = ({
  events,
  getNextEvents,
  loading,
  moreEvents,
}: EventListProps): JSX.Element => {
  const renderEvents = events?.map(
    (event: EventData): JSX.Element => {
      return <EventListItem key={event.id} event={event} />;
    }
  );

  return (
    <Fragment>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {renderEvents}
        </InfiniteScroll>
      )}
    </Fragment>
  );
};

export { EventList };
