import React, { CSSProperties, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

interface PhotoDropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const PhotoDropzone = ({ setFiles }: PhotoDropzoneProps) => {
  const dropzoneStyles: CSSProperties = {
    border: 'dashed 3px black',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center',
  };

  const dropzoneActive: CSSProperties = {
    border: 'dashed 3px red',
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles}
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header as='p' content='Haga Click o Arrastre Imagen aqui' />
    </div>
  );
};
