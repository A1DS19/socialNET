import React from 'react';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import { EventListAttendee } from './EventListAttendee';
import { EventData, EventAttendee } from '../../App';
import { Link } from 'react-router-dom';

interface EventListItemProps {
  event: EventData;
}

const EventListItem = ({ event }: EventListItemProps): JSX.Element => {
  const renderAttendees = event.attendees.map(
    (attendee: EventAttendee): JSX.Element => {
      return <EventListAttendee key={attendee.id} attendee={attendee} />;
    }
  );

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={event.hostPhotoURL}
              alt='/assets/user.png'
            />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description content={event.hostedBy} />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name='clock' /> {event.date}
          <Icon name='point' /> {event.venue}
        </span>
      </Segment>

      <Segment secondary>
        <List horizontal>{renderAttendees}</List>
      </Segment>

      <Segment clearing>
        <div style={{ marginBottom: '10px' }}>{event.description}</div>
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color='teal'
          floated='right'
          content='Ver'
        />
        <Button color='red' floated='right' content='Borrar' />
      </Segment>
    </Segment.Group>
  );
};

export { EventListItem };
