import { StoreState } from './../../reducers/index';
import { useSelector } from 'react-redux';
import { EventData } from '../../actions/event';

//Extrae datos de evento basado en el id
export function useEventData(eventId: string): EventData | undefined {
  //obtener data por id que viene de state

  const event = useSelector(({ events }: StoreState) => {
    return events?.selectedEvent;
  });

  // const event = useSelector(({ events }: StoreState) => {
  //   return events?.events.find((event: EventData) => event.id === eventId);
  // });

  return event;
}
