import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { StoreState } from '../../reducers';
import { signOutUser } from '../../actions/auth';
import { toast } from 'react-toastify';

const SignedInMenu = (): JSX.Element => {
  const user = useSelector((state: StoreState) => state.profile.currentUserProfile);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSignOutPush = async () => {
    try {
      await dispatch(signOutUser());
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <Menu.Item position='right'>
        <Image avatar spaced='right' src={user?.photoURL || '/assets/user.png'} />
        <Dropdown pointing='top left' text={user?.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/createEvent' text='Crear Evento' icon='plus' />
            <Dropdown.Item
              as={Link}
              to={`/profile/${user?.id}`}
              text='Mi Perfil'
              icon={'user'}
            />
            <Dropdown.Item as={Link} to='/account' text='Mi Cuenta' icon={'settings'} />
            <Dropdown.Item text='Salir' icon='power' onClick={onSignOutPush} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Fragment>
  );
};

export { SignedInMenu };
