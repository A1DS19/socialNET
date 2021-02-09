import React from 'react';
import { Grid } from 'semantic-ui-react';
import { EventDetailChat } from './EventDetailChat';
import { EventDetailHeader } from './EventDetailHeader';
import { EventDetailInfo } from './EventDetailInfo';
import { EventDetailSidebar } from './EventDetailSidebar';
import { Redirect, RouteComponentProps } from 'react-router';
import { useEventData } from '../hooks/useEvent';
import { useFirestoreDoc } from '../hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../firestore/firestoreService';
import { EventData, listenSelectedEvent } from '../../actions/event';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../reducers';
import { LoaderComponent } from '../common/Loader';

export interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const EventDetail = ({ match }: Props) => {
  const dispatch = useDispatch();
  const eventId = match.params.id;
  const event = useEventData(eventId);
  const { currentUser } = useSelector((state: StoreState) => state.auth);
  const isHost = event?.hostUid === currentUser?.uid;
  //encuentra un dato en array y devuelve boolean si lo encuentra o no
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);
  const { loading, error } = useSelector((state: StoreState) => state.loading);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(eventId),
    data: (event: EventData) => dispatch(listenSelectedEvent(event)),
    dependencies: [eventId],
  });

  if (error) return <Redirect to='/error' />;

  //Para que no aparezcan errores de 'undefined'
  if (loading || (!event && !error))
    return <LoaderComponent content='Cargando Evento...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} isHost={isHost} isGoing={isGoing} />
        <EventDetailInfo event={event} />
        <EventDetailChat eventId={event?.id} />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailSidebar event={event} hostUid={event?.hostUid} />
      </Grid.Column>
    </Grid>
  );
};

export { EventDetail };
