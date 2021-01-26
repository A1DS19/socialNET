import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from '../../../actions/modals';

interface Props {
  size: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
  header: string;
}

const ModalWrapper: React.FC<Props> = ({ children, header, size }) => {
  const dispatch = useDispatch();
  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} header={header} size={size}>
      {header && <Modal.Header>{header}</Modal.Header>}

      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export { ModalWrapper };
