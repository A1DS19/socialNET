import { format } from 'date-fns';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { EventData } from '../../actions/event';
import { TIME_VALUE } from '../../actions/types';
import {
  addUserAttendance,
  cancelUserAttendance,
} from '../../firestore/firestoreService';
import { StoreState } from '../../reducers';
import { AuthModal } from '../auth/AuthModal';

interface Props {
  event: EventData | undefined;
  isHost: boolean;
  isGoing: boolean | undefined;
}

const EventDetailHeader = ({ event, isHost, isGoing }: Props) => {
  const [loading, setLoading] = useState(false);
  const { authenticated } = useSelector((state: StoreState) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);

  const handleUserJoin = async () => {
    if (!authenticated) {
      setModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCancel = async () => {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {modalOpen && <AuthModal setModalOpen={setModalOpen} />}
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
                  <p>{format(event?.date!, TIME_VALUE)}</p>
                  <p>
                    Hosteado por:{' '}
                    <strong>
                      {' '}
                      <Link
                        style={{ color: '#f2711c' }}
                        to={`/profile/${event?.hostUid}`}
                      >
                        {event?.hostedBy}
                      </Link>{' '}
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached='bottom' clearing>
          {!isHost && (
            <Fragment>
              {isGoing ? (
                <Button loading={loading} onClick={handleUserCancel}>
                  Cancelar Reservacion
                </Button>
              ) : (
                <Button loading={loading} color='teal' onClick={handleUserJoin}>
                  Unirme a Evento
                </Button>
              )}
            </Fragment>
          )}

          {isHost && (
            <Button as={Link} to={`/manage/${event?.id}`} color='orange' floated='right'>
              Manejar Evento
            </Button>
          )}
        </Segment>
      </Segment.Group>
    </Fragment>
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
