import React, { Fragment } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { EventAttendee, EventData } from '../../actions/event';

interface Props {
  event: EventData | undefined;
}

const EventDetailSidebar = ({ event }: Props) => {
  const renderAttendees = event?.attendees ? (
    event.attendees.map(
      (attendee: EventAttendee): JSX.Element => {
        return (
          <Item key={attendee.id} style={{ position: 'relative' }}>
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
        {event!.attendees!.length > 1 ? 'Personas van' : 'Persona va'}
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
