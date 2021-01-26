import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { SignedOutMenu } from './SignedOutMenu';
import { SignedInMenu } from './SignedInMenu';
import { useSelector } from 'react-redux';
import { StoreState } from '../../reducers';

const Navbar = (): JSX.Element => {
  const auth = useSelector((state: StoreState) => state.auth);

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '15px' }} />
          socialNET
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events' />
        {auth.authenticated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Crear Evento' />
          </Menu.Item>
        )}
        {auth.authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};

export { Navbar };
