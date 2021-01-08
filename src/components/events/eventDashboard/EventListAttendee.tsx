import React from 'react';
import { Image, List } from 'semantic-ui-react';
import { EventAttendee } from '../../../actions/event';

interface EventListAttendeeProps {
  attendee: EventAttendee;
}

const EventListAttendee = ({ attendee }: EventListAttendeeProps) => {
  return (
    <List.Item>
      <Image size='mini' circular src={attendee.photoURL} alt='/assets/user.png' />
    </List.Item>
  );
};

export { EventListAttendee };
