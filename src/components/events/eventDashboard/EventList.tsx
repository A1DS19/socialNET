import React, { Fragment } from 'react';
import { EventListItem } from './EventListItem';
import { EventData } from '../../../actions/event';

interface EventListProps {
  events: EventData[];
}

const EventList = ({ events }: EventListProps): JSX.Element => {
  const renderEvents = events?.map(
    (event: EventData): JSX.Element => {
      return <EventListItem key={event.id} event={event} />;
    }
  );

  return <Fragment>{renderEvents}</Fragment>;
};

export { EventList };
