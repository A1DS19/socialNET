import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { EventList } from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers/index';
import { EventListItemLoader } from './EventListItemLoader';
import { EventFilters } from './EventFilters';
import { clearEvents, fetchEvents } from '../../../actions/event';
import { EventsFeed } from './EventsFeed';
import { types } from '../../../actions/types';

const EventDashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisibleDoc,
    retainState,
  } = useSelector((state: StoreState) => state.events);
  const { loading } = useSelector((state: StoreState) => state.loading);
  const { authenticated } = useSelector((state: StoreState) => state.auth);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    //Si retain state es true no correr el resto
    //ya que doc existe
    if (retainState) {
      return;
    }
    setLoadingInitial(true);
    const getLastVisibleDoc = async () => {
      dispatch(fetchEvents(filter, startDate, 2));
      setLoadingInitial(false);
    };
    getLastVisibleDoc();
    return () => {
      dispatch({ type: types.RETAIN_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  const handleFetchNextEvents = async () => {
    dispatch(fetchEvents(filter, startDate, 2, lastVisibleDoc));
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
        <EventFilters loading={loading} />
      </Grid.Column>
      {/*Si se estan cargando mas eventos aparece esto abajo*/}
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
};

export { EventDashboard };
