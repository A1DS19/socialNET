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
import { EventData, listenEventsFS } from '../../actions/event';
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
  const { loading, error } = useSelector((state: StoreState) => state.loading);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(eventId),
    data: (event: EventData) => dispatch(listenEventsFS([event])),
    dependencies: [eventId],
  });

  if (error) return <Redirect to='/error' />;

  //Para que no aparezcan errores de 'undefined'
  if (loading || (!event && !error))
    return <LoaderComponent content='Cargando Evento...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>

      <Grid.Column width={6}>
        <EventDetailSidebar event={event} />
      </Grid.Column>
    </Grid>
  );
};

export { EventDetail };
