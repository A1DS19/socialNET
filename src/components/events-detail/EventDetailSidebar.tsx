import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Item, Label, Segment } from 'semantic-ui-react';
import { EventAttendee, EventData } from '../../actions/event';

interface Props {
  event: EventData | undefined;
  hostUid: string | undefined;
}

const EventDetailSidebar = ({ event, hostUid }: Props) => {
  const renderAttendees = event?.attendees ? (
    event.attendees.map(
      (attendee: EventAttendee): JSX.Element => {
        return (
          <Item
            as={Link}
            to={`/profile/${attendee.id}`}
            key={attendee.id}
            style={{ position: 'relative' }}
          >
            {hostUid === attendee.id && (
              <Label
                style={{ position: 'absolute' }}
                ribbon='right'
                color='orange'
                content='Host'
              />
            )}
            <Item.Image size='tiny' src={attendee.photoURL} />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <span>{attendee.name}</span>
              </Item.Header>
            </Item.Content>
          </Item>
        );
      }
    )
  ) : (
    <Item>
      <Item.Header as='h3'>
        <span>No hay particantes</span>
      </Item.Header>
    </Item>
  );

  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {event?.attendees?.length}{' '}
        {event!.attendees!.length > 1
          ? 'Personas van'
          : event!.attendees!.length === 1
          ? 'Persona van'
          : event!.attendees!.length === 0 && 'Personas van'}
      </Segment>

      <Segment attached>
        <Item.Group relaxed divided>
          {renderAttendees}
        </Item.Group>
      </Segment>
    </Fragment>
  );
};

export { EventDetailSidebar };
