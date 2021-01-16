import { format } from 'date-fns';
import React, { useState } from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import { Coords, EventData } from '../../actions/event';
import { TIME_VALUE } from '../../actions/types';
import { EventDetailMap } from './EventDetailMap';
interface Props {
  event: EventData | undefined;
}

const EventDetailInfo = ({ event }: Props) => {
  const [show_hide_map, setMapState] = useState(false);

  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event?.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(event?.date!, TIME_VALUE)}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event?.venue.address}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color='teal'
              size='tiny'
              content={show_hide_map ? 'Cerrar Mapa' : 'Ver Mapa'}
              onClick={() => setMapState(!show_hide_map)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {show_hide_map && (
        <EventDetailMap
          center={event?.venue.latLng as Coords}
          zoom={14}
          width={'100%'}
          heigth={300}
        />
      )}
    </Segment.Group>
  );
};

export { EventDetailInfo };
