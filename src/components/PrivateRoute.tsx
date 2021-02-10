import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { StoreState } from '../reducers';
import { AuthModal } from './auth/AuthModal';

interface Props {
  Component?: any;
  prevLocation?: any;
  path?: any;
  rest?: any;
}

export const PrivateRoute = ({ Component, prevLocation, ...rest }: Props) => {
  const { authenticated } = useSelector((state: StoreState) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => (authenticated ? <Component {...props} /> : <AuthModal />)}
    />
  );
};
