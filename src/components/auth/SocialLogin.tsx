import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../actions/modals';
import { socialLogin, SelectedProviders } from '../../firestore/firebaseService';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const handleSocialLogin = (providerId: SelectedProviders) => {
    dispatch(closeModal());
    socialLogin(providerId);
  };

  return (
    <Fragment>
      <Button
        icon='facebook'
        fluid
        color='facebook'
        content='Login con Facebook'
        style={{ marginBottom: 10 }}
        onClick={() => handleSocialLogin('FacebookAuthProvider')}
      />
      <Button
        icon='google'
        fluid
        color='google plus'
        content='Login con Google'
        style={{ marginBottom: 10 }}
        onClick={() => handleSocialLogin('GoogleAuthProvider')}
      />
    </Fragment>
  );
};

export { SocialLogin };
