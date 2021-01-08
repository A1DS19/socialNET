import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { EventData } from '../../actions/event';

interface Props {
  event: EventData | undefined;
}

const EventDetailHeader = ({ event }: Props) => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event?.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size='huge' content={event?.title} style={{ color: 'white' }} />
                <p>{event?.date}</p>
                <p>
                  Hosteado por: <strong>{event?.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button>Cancelar Reservacion</Button>
        <Button color='teal'>Unirme a Evento</Button>

        <Button as={Link} to={`/manage/${event?.id}`} color='orange' floated='right'>
          Manejar Evento
        </Button>
      </Segment>
    </Segment.Group>
  );
};

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export { EventDetailHeader };
