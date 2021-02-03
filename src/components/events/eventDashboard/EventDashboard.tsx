import React, { Fragment, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { EventList } from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers/index';
import { EventListItemLoader } from './EventListItemLoader';
import { EventFilters } from './EventFilters';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { listenToEventsFromFirestore } from '../../../firestore/firestoreService';
import { EventData, listenEventsFS } from '../../../actions/event';

const EventDashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const { events } = useSelector((state: StoreState) => state.events);
  const { loading } = useSelector((state: StoreState) => state.loading);
  //Filtros

  const [predicate, setPredicate] = useState(
    new Map<string, any>([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );

  const handleSetPredicate = (key: string, value: any) => {
    setPredicate(new Map(predicate.set(key, value)));
  };
  //Filtros end

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events: EventData[]) => dispatch(listenEventsFS(events)),
    dependencies: [dispatch, predicate],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading ? (
          <Fragment>
            <EventListItemLoader />
            <EventListItemLoader />
            <EventListItemLoader />
          </Fragment>
        ) : (
          <EventList events={events} />
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
    </Grid>
  );
};

export { EventDashboard };
