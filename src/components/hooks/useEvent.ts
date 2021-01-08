import { StoreState } from './../../reducers/index';
import { useSelector } from 'react-redux';
import { EventData } from '../../actions/event';

//Extrae datos de evento basado en el id
export function useEventData(eventId: string): EventData | undefined {
  //obtener data por id que viene de state
  const data = useSelector((state: StoreState) =>
    state.events.find((event: EventData) => event.id === eventId)
  );
  return data;
}
