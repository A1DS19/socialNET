import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';

interface SignedInProps {
  onSignOutPush: () => void;
}

const SignedInMenu = ({ onSignOutPush }: SignedInProps): JSX.Element => {
  return (
    <Fragment>
      <Menu.Item position='right'>
        <Image avatar spaced='right' src='/assets/user.png' />
        <Dropdown pointing='top left' text='username'>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/createEvent' text='Crear Evento' icon='plus' />
            <Dropdown.Item as={Link} to='/createEvent' text='Mi perfil' icon='user' />
            <Dropdown.Item text='Salir' icon='power' onClick={onSignOutPush} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Fragment>
  );
};

export { SignedInMenu };
