import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
  inverted?: boolean;
  content?: string;
}

const LoaderComponent: React.FC<Props> = ({
  inverted = true,
  content = 'Cargando...',
}) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} />
    </Dimmer>
  );
};

export { LoaderComponent };
