import React from 'react';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import { EventListAttendee } from './EventListAttendee';
import { EventData, EventAttendee } from '../../../actions/event';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { TIME_VALUE } from '../../../actions/types';
import { deleteEventFirestore } from '../../../firestore/firestoreService';

interface EventListItemProps {
  event: EventData;
}

const EventListItem = ({ event }: EventListItemProps): JSX.Element => {
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
              <Item.Description>
                Hosteado por:
                <Link style={{ color: '#f2711c' }} to={`/profile/${event.hostUid}`}>
                  {' '}
                  {event.hostedBy}
                </Link>
              </Item.Description>

              <Label
                style={{ top: '-40px' }}
                ribbon='right'
                color={event.isCancelled ? 'red' : 'green'}
                content={event.isCancelled ? 'Evento Cancelado' : 'Evento Activo'}
              />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name='clock' /> {format(event?.date!, TIME_VALUE)}
          <Icon name='point' /> {event.venue.address}
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
          onClick={() => deleteEventFirestore(event.id!)}
          color='red'
          floated='right'
          content='Borrar'
        />
      </Segment>
    </Segment.Group>
  );
};

export { EventListItem };
