import React, { Fragment } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../reducers';

interface Props {
  predicate: Map<string, any>;
  setPredicate: (key: string, value: any) => void;
  loading: any;
}

const EventFilters = ({ predicate, loading, setPredicate }: Props) => {
  const { authenticated } = useSelector((state: StoreState) => state.auth);

  return (
    <Fragment>
      {authenticated && (
        <Fragment>
          <Menu vertical size='large' style={{ width: '100%' }}>
            <Header icon='filter' attached color='teal' content='Filtros' />
            <Menu.Item
              disabled={loading}
              active={predicate.get('filter') === 'all'}
              onClick={() => setPredicate('filter', 'all')}
              content='Todos los Eventos'
            />
            <Menu.Item
              disabled={loading}
              active={predicate.get('filter') === 'isGoing'}
              onClick={() => setPredicate('filter', 'isGoing')}
              content='Voy a Ir'
            />
            <Menu.Item
              disabled={loading}
              active={predicate.get('filter') === 'isHosting'}
              onClick={() => setPredicate('filter', 'isHosting')}
              content='Voy a Hostear'
            />
          </Menu>
        </Fragment>
      )}
      <Header icon='calendar' attached color='teal' content='Calendario' />
      <Calendar
        onChange={(date) => setPredicate('startDate', date)}
        value={predicate.get('startDate') || new Date()}
      />
    </Fragment>
  );
};

export { EventFilters };
