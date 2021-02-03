import React, { useState } from 'react';
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { UserDataProps } from './ProfilePage';
import { IsCurrentUserProps } from './ProfileContent';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../reducers';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { getUserEventsQuery } from '../../firestore/firestoreService';
import { listenUserEvents } from '../../actions/profile';
import { EventData } from '../../actions/event';
import { format } from 'date-fns';

export const EventsTab = ({
  user,
  isCurrentUser,
}: UserDataProps & IsCurrentUserProps) => {
  const [activeTab, setActiveTab] = useState<string | number | undefined>(0);
  const dispatch = useDispatch();
  const { profileEvents } = useSelector((state: StoreState) => state.profile);
  const { loading } = useSelector((state: StoreState) => state.loading);

  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, user?.id),
    data: (events: any) => dispatch(listenUserEvents(events)),
    dependencies: [dispatch, activeTab, user?.uid],
  });

  const panes = [
    { menuItem: 'Eventos Futuros', pane: { key: 'future' } },
    { menuItem: 'Eventos Pasados', pane: { key: 'past' } },
    { menuItem: 'Hosteando', pane: { key: 'hosteando' } },
  ];

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width='16'>
          <Header floated='left' icon='calendar' content='Eventos' />
        </Grid.Column>
        <Grid.Column width='16'>
          <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow='5' style={{ marginTop: 10 }}>
            {profileEvents.map((event: EventData) => (
              <Card key={event.id} as={Link} to={`/events/${event.id}`}>
                <Image
                  src={`/assets/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign='left' />
                  <Card.Meta>
                    <div>{format(event.date, 'dd MMM yyyy')}</div>
                    <div>{format(event.date, 'hh:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
