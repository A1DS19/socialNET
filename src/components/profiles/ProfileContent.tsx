import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { UserDataProps } from './ProfilePage';
import { AboutTab } from './AboutTab';
import { PhotosTab } from './PhotosTab';
import { EventsTab } from './EventsTab';
import { FollowingTab } from './FollowingTab';
export interface IsCurrentUserProps {
  isCurrentUser: boolean;
}

export const ProfileContent = ({
  user,
  isCurrentUser,
}: UserDataProps & IsCurrentUserProps) => {
  const [activeTab, setActiveTab] = useState<string | number | undefined>(0);

  const panes = [
    {
      menuItem: 'Sobre',
      render: () => <AboutTab user={user} isCurrentUser={isCurrentUser} />,
    },
    {
      menuItem: 'Fotos',
      render: () => <PhotosTab user={user} isCurrentUser={isCurrentUser} />,
    },
    {
      menuItem: 'Eventos',
      render: () => <EventsTab user={user} isCurrentUser={isCurrentUser} />,
    },
    {
      menuItem: 'Seguidores',
      render: () => <FollowingTab key={user?.id} activeTab={activeTab} user={user} />,
    },
    {
      menuItem: 'Siguiendo',
      render: () => <FollowingTab key={user?.id} activeTab={activeTab} user={user} />,
    },
  ];

  return (
    <Tab
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
      menu={{ fluid: true, vertical: true }}
      menuPosition='left'
      panes={panes}
    />
  );
};
