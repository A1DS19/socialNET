import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

interface Props {
  profile: any;
}

export const ProfileCard = ({ profile }: Props) => {
  return (
    <Card as={Link} to={`/profile/${profile.id}`}>
      <Image src={profile.photoURL || '/assets/user.png'} />
      <Card.Content>
        <Card.Header content={profile.displayName} />
      </Card.Content>
    </Card>
  );
};
