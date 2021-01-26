import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { openModal } from '../../actions/modals';

const SignedOutMenu = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Menu.Item position='right'>
        <Button
          basic
          inverted
          content='Login'
          onClick={() => dispatch(openModal({ type: 'LoginForm' }))}
        />
        <Button
          basic
          inverted
          content='Registro'
          style={{ marginLeft: '0.5em' }}
          onClick={() => dispatch(openModal({ type: 'RegisterForm' }))}
        />
      </Menu.Item>
    </Fragment>
  );
};

export { SignedOutMenu };
