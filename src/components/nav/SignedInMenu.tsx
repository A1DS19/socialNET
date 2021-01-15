import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { StoreState } from '../../reducers';

interface SignedInProps {
  onSignOutPush: () => void;
}

const SignedInMenu = ({ onSignOutPush }: SignedInProps): JSX.Element => {
  const user = useSelector((state: StoreState) => state.auth.currentUser);

  return (
    <Fragment>
      <Menu.Item position='right'>
        <Image avatar spaced='right' src={user?.photoURL || '/assets/user.png'} />
        <Dropdown pointing='top left' text={user?.email}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/createEvent' text='Crear Evento' icon='plus' />
            <Dropdown.Item as={Link} to='/createEvent' text='Mi Perfil' icon={'user'} />
            <Dropdown.Item text='Salir' icon='power' onClick={onSignOutPush} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Fragment>
  );
};

export { SignedInMenu };
