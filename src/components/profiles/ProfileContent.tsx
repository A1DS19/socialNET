import React from 'react';
import { Tab } from 'semantic-ui-react';
import { UserDataProps } from './ProfilePage';
import { AboutTab } from './AboutTab';
import { PhotosTab } from './PhotosTab';
export interface IsCurrentUserProps {
  isCurrentUser: boolean;
}

export const ProfileContent = ({
  user,
  isCurrentUser,
}: UserDataProps & IsCurrentUserProps) => {
  const panes = [
    {
      menuItem: 'Sobre',
      render: () => <AboutTab user={user} isCurrentUser={isCurrentUser} />,
    },
    {
      menuItem: 'Fotos',
      render: () => <PhotosTab user={user} isCurrentUser={isCurrentUser} />,
    },
    { menuItem: 'Eventos', render: () => <Tab.Pane>Eventos </Tab.Pane> },
    { menuItem: 'Seguidores', render: () => <Tab.Pane>Seguidores </Tab.Pane> },
    { menuItem: 'Siguiendo', render: () => <Tab.Pane>Siguiendo </Tab.Pane> },
  ];

  return <Tab menu={{ fluid: true, vertical: true }} menuPosition='left' panes={panes} />;
};
