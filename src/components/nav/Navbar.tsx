import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface NavbarProps {
  setFormOpen: (state: boolean) => void;
}

const Navbar = ({ setFormOpen }: NavbarProps): JSX.Element => {
  const showEventForm = () => setFormOpen(true);

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: '15px' }} />
          socialNET
        </Menu.Item>
        <Menu.Item name='Events' />
        <Menu.Item>
          <Button onClick={showEventForm} positive inverted content='Crear Evento' />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button basic inverted content='Login' />
          <Button basic inverted content='Registro' style={{ marginLeft: '0.5em' }} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export { Navbar };
