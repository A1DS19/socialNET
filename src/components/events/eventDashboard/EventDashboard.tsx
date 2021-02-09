import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { EventList } from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers/index';
import { EventListItemLoader } from './EventListItemLoader';
import { EventFilters } from './EventFilters';
import { clearEvents, fetchEvents } from '../../../actions/event';
import { EventsFeed } from './EventsFeed';

const EventDashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const { events, moreEvents } = useSelector((state: StoreState) => state.events);
  const { loading } = useSelector((state: StoreState) => state.loading);
  const { authenticated } = useSelector((state: StoreState) => state.auth);
  const [lastDocSnapshot, setLastDocSnapshot] = useState<any>(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  //Filtros

  const [predicate, setPredicate] = useState(
    new Map<string, any>([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );

  const handleSetPredicate = (key: string, value: any) => {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  };
  //Filtros end

  useEffect(() => {
    setLoadingInitial(true);
    const getLastVisibleDoc = async () => {
      const lastVisibleDoc = await dispatch(fetchEvents(predicate, 2));
      setLastDocSnapshot(lastVisibleDoc);
      setLoadingInitial(false);
    };
    getLastVisibleDoc();
    return () => {
      dispatch(clearEvents());
    };
  }, [dispatch, predicate]);

  const handleFetchNextEvents = async () => {
    const lastVisibleDoc = await dispatch(fetchEvents(predicate, 2, lastDocSnapshot));
    setLastDocSnapshot(lastVisibleDoc);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
          <Fragment>
            <EventListItemLoader />
            <EventListItemLoader />
            <EventListItemLoader />
          </Fragment>
        )}
        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {authenticated && <EventsFeed />}
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
      {/*Si se estan cargando mas eventos aparece esto abajo*/}
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
};

export { EventDashboard };
