import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { SignedOutMenu } from './SignedOutMenu';
import { SignedInMenu } from './SignedInMenu';

const Navbar = (): JSX.Element => {
  const [auth, setAuth] = useState(false);
  const history = useHistory();

  const onSignOutPush = (): void => {
    setAuth(false);
    history.push('/');
  };

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '15px' }} />
          socialNET
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events' />
        {auth && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Crear Evento' />
          </Menu.Item>
        )}
        {auth ? (
          <SignedInMenu onSignOutPush={onSignOutPush} />
        ) : (
          <SignedOutMenu setAuth={setAuth} />
        )}
      </Container>
    </Menu>
  );
};

export { Navbar };
