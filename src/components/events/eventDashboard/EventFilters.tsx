import React, { Fragment } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers';
import { setFilter, setStartDate } from '../../../actions/event';

interface Props {
  loading: any;
}

const EventFilters = ({ loading }: Props) => {
  const dispatch = useDispatch();
  const { filter, startDate } = useSelector((state: StoreState) => state.events);
  const { authenticated } = useSelector((state: StoreState) => state.auth);

  return (
    <Fragment>
      {authenticated && (
        <Fragment>
          <Menu vertical size='large' style={{ width: '100%' }}>
            <Header icon='filter' attached color='teal' content='Filtros' />
            <Menu.Item
              disabled={loading}
              active={filter === 'all'}
              onClick={() => dispatch(setFilter('all'))}
              content='Todos los Eventos'
            />
            <Menu.Item
              disabled={loading}
              active={filter === 'isGoing'}
              onClick={() => dispatch(setFilter('isGoing'))}
              content='Voy a Ir'
            />
            <Menu.Item
              disabled={loading}
              active={filter === 'isHosting'}
              onClick={() => dispatch(setFilter('isHosting'))}
              content='Voy a Hostear'
            />
          </Menu>
        </Fragment>
      )}
      <Header icon='calendar' attached color='teal' content='Calendario' />
      <Calendar
        onChange={(date) => dispatch(setStartDate(date))}
        value={startDate || new Date()}
      />
    </Fragment>
  );
};

export { EventFilters };
