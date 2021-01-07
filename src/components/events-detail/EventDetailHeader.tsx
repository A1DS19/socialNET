import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';

const EventDetailHeader = () => {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/drinks.jpg`} fluid style={eventImageStyle} />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size='huge' content='titulo evento' style={{ color: 'white' }} />
                <p>fecha evento</p>
                <p>
                  Hosteado por: <strong>usuario</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button>Cancelar Reservacion</Button>
        <Button color='teal'>Unirme a Evento</Button>

        <Button as={Link} to={`/manage/event.id`} color='orange' floated='right'>
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
