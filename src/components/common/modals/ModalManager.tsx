import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../reducers';
import { LoginForm } from '../../auth/LoginForm';
import { RegisterForm } from '../../auth/RegisterForm';

const ModalManager = (): JSX.Element | null => {
  const modalLookup = { LoginForm, RegisterForm };
  const currentModal = useSelector((state: StoreState) => state.modals);

  let renderedModal;
  if (currentModal) {
    const { type, props } = currentModal;
    const ModalComponent = modalLookup[type];
    renderedModal = <ModalComponent {...props} />;
  }

  return <span>{renderedModal}</span>;
};

export { ModalManager };

// if (LoginForm.name === currentModal.type) {
//   return <LoginForm {...currentModal.props} />;
// }
