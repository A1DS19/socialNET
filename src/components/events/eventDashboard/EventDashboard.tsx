import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { EventList } from './EventList';
import { EventForm } from '../eventForm/EventForm';
import { sampleData } from '../../../api/sampleData';

export interface EventData {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: EventAttendee[];
}

export interface EventAttendee {
  id: string;
  name: string;
  photoURL: string;
}

interface EventDashboardProps {
  formOpen: boolean;
  setFormOpen: (state: boolean) => void;
}

const EventDashboard = ({ formOpen, setFormOpen }: EventDashboardProps): JSX.Element => {
  const [events, setEvents] = useState<EventData[]>(sampleData);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={sampleData} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && <EventForm setFormOpen={setFormOpen} />}
      </Grid.Column>
    </Grid>
  );
};

export { EventDashboard };
