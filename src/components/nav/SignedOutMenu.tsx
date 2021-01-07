import React, { Fragment } from 'react';
import { Button, Menu } from 'semantic-ui-react';

interface SignedOutProps {
  setAuth: (state: boolean) => void;
}

const SignedOutMenu = ({ setAuth }: SignedOutProps): JSX.Element => {
  return (
    <Fragment>
      <Menu.Item position='right'>
        <Button basic inverted content='Login' onClick={() => setAuth(true)} />
        <Button basic inverted content='Registro' style={{ marginLeft: '0.5em' }} />
      </Menu.Item>
    </Fragment>
  );
};

export { SignedOutMenu };
