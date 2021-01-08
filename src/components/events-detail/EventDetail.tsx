import React from 'react';
import { Grid } from 'semantic-ui-react';
import { EventDetailChat } from './EventDetailChat';
import { EventDetailHeader } from './EventDetailHeader';
import { EventDetailInfo } from './EventDetailInfo';
import { EventDetailSidebar } from './EventDetailSidebar';
import { RouteComponentProps } from 'react-router';
import { useEventData } from '../hooks/useEvent';

export interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const EventDetail = ({ match }: Props) => {
  const eventId = match.params.id;

  const event = useEventData(eventId);

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
