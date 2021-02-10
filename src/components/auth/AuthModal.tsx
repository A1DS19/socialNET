import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { openModal } from '../../actions/modals';

export const AuthModal: React.FC<{
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setModalOpen }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    setModalOpen && setModalOpen(false);
    history.goBack();
  };

  const openModals = (type: 'LoginForm' | 'RegisterForm') => {
    if (type === 'LoginForm') {
      dispatch(openModal({ type }));
    } else {
      dispatch(openModal({ type }));
    }
    handleClose();
  };

  return (
    <Modal open={open} size='mini' onClose={handleClose}>
      <Modal.Header content='Necesita iniciar sesion para accesar al contenido' />
      <Modal.Content>
        <p>Necesita iniciar sesion o registrarse</p>
        <Button.Group widths='4'>
          <Button
            fluid
            color='teal'
            content='Login'
            onClick={() => openModals('LoginForm')}
          />
          <Button.Or />
          <Button
            fluid
            color='orange'
            content='Registro'
            onClick={() => openModals('RegisterForm')}
          />
        </Button.Group>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p>O click en cancelar para volver a la pagina principal</p>
          <Button onClick={handleClose} content='Cancelar' />
        </div>
      </Modal.Content>
    </Modal>
  );
};
