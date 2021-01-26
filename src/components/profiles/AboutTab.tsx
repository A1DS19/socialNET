import React, { Fragment, useState } from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { UserDataProps } from './ProfilePage';
import { format } from 'date-fns';
import { ProfileForm } from './ProfileForm';
import { IsCurrentUserProps } from './ProfileContent';

export const AboutTab = ({ user, isCurrentUser }: UserDataProps & IsCurrentUserProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width='16'>
          <Header floated='left' icon='user' content={`Sobre ${user?.displayName}`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? 'Cancelar' : 'Editar'}
            />
          )}
        </Grid.Column>
        <Grid.Column width='16'>
          {editMode ? (
            <Fragment>
              <p>Editar Perfil</p>
              <ProfileForm user={user} setEditMode={setEditMode} />
            </Fragment>
          ) : (
            <Fragment>
              <div style={{ marginBottom: 10 }}>
                <strong>Miembro desde: {format(user?.createdAt!, 'dd MMMM yyyy')}</strong>
                <div>{user?.description || null}</div>
              </div>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
