import React, { Fragment, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { PhotoCropper } from './PhotoCropper';
import { PhotoDropzone } from './PhotoDropzone';
import { v4 as uuidv4 } from 'uuid';
import { getFileExtension } from './getFileExtension';
import { uploadFirebaseStorage } from '../../../firestore/firebaseService';
import { toast } from 'react-toastify';
import { updateUserProfilePhoto } from '../../../firestore/firestoreService';

declare global {
  interface File {
    preview: any;
  }
}

interface PhotoUploadProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PhotoUpload = ({ setEditMode }: PhotoUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = () => {
    setLoading(true);
    const filename = uuidv4() + '.' + getFileExtension(files[0].name);
    const uploadTask = uploadFirebaseStorage(image!, filename);

    //sigue el progreso de la subida de la imagen
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //Si los archivos fuesen mas grandes el progreso se podria ver
        //por ahora no
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is ' + progress + '% done');
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  return (
    <Grid>
      <Grid.Column width='4'>
        <Header color='teal' sub content='Paso 1 - Agregar una Foto' />
        <PhotoDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width='1' />
      <Grid.Column width='4'>
        <Header color='teal' sub content='Paso 2 - Recortar Tamano' />
        {files.length > 0 && (
          <PhotoCropper setImage={setImage} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width='1' />
      <Grid.Column width='4'>
        <Header color='teal' sub content='Paso 3 - Ver Cambios y Subir' />
        {files.length > 0 && (
          <Fragment>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                loading={loading}
                style={{ width: 100 }}
                positive
                icon='check'
                onClick={handleUploadImage}
              />
              <Button
                disabled={loading}
                style={{ width: 100 }}
                icon='close'
                onClick={handleCancelCrop}
              />
            </Button.Group>
          </Fragment>
        )}
      </Grid.Column>
    </Grid>
  );
};
