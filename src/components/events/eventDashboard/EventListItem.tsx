import React from 'react';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import { EventListAttendee } from './EventListAttendee';
import { EventData, EventAttendee, deleteEvent } from '../../../actions/event';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { TIME_VALUE } from '../../../actions/types';

interface EventListItemProps {
  event: EventData;
}

const EventListItem = ({ event }: EventListItemProps): JSX.Element => {
  const dispatch = useDispatch();

  const renderAttendees = event.attendees ? (
    event.attendees!.map(
      (attendee: EventAttendee): JSX.Element => {
        return <EventListAttendee key={attendee.id} attendee={attendee} />;
      }
    )
  ) : (
    <List.Item>No hay participantes</List.Item>
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
          <Icon name='clock' /> {format(event?.date!, TIME_VALUE)}
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
        <Button
          onClick={() => dispatch(deleteEvent(event.id!))}
          color='red'
          floated='right'
          content='Borrar'
        />
      </Segment>
    </Segment.Group>
  );
};

export { EventListItem };
