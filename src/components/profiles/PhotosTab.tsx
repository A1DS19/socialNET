import React, { Fragment, useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import { UserDataProps } from './ProfilePage';
import { IsCurrentUserProps } from './ProfileContent';
import { PhotoUpload } from '../common/photos/PhotoUpload';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from '../../firestore/firestoreService';
import { deleteFromFirestoreStorage } from '../../firestore/firebaseService';
import { useDispatch, useSelector } from 'react-redux';
import { listenUserPhotos } from '../../actions/profile';
import { StoreState } from '../../reducers';
import { toast } from 'react-toastify';

export const PhotosTab = ({
  user,
  isCurrentUser,
}: UserDataProps & IsCurrentUserProps) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: StoreState) => state.loading);
  const { photos } = useSelector((state: StoreState) => state.profile);
  //para cuando se necesitan 2 o mas loaders independientes
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(user?.id),
    data: (photos: any) => dispatch(listenUserPhotos(photos)),
    dependencies: [user?.uid, dispatch],
  });

  const handleSetMainPhoto = async (photo: any, target: any) => {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  };

  const handleDeletePhoto = async (photo: any, target: any) => {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirestoreStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  };

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width='16'>
          <Header floated='left' icon='user' content={`Fotos de ${user?.displayName}`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? 'Cancelar' : 'Agregar Foto'}
            />
          )}
        </Grid.Column>
        <Grid.Column width='16'>
          {editMode ? (
            <Fragment>
              <PhotoUpload setEditMode={setEditMode} />
            </Fragment>
          ) : (
            <Fragment>
              <Card.Group itemsPerRow='3'>
                {photos.map((photo: any) => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    <Button.Group fluid widths='2'>
                      <Button
                        name={photo.id}
                        loading={updating.isUpdating && updating.target === photo.id}
                        disabled={photo.url === user?.photoURL}
                        basic
                        color='green'
                        content='Principal'
                        onClick={() => handleSetMainPhoto(photo, photo.id)}
                      />
                      <Button
                        name={photo.id}
                        loading={deleting.isDeleting && deleting.target === photo.id}
                        disabled={photo.url === user?.photoURL}
                        basic
                        color='red'
                        icon='trash'
                        onClick={() => handleDeletePhoto(photo, photo.id)}
                      />
                    </Button.Group>
                  </Card>
                ))}
              </Card.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
