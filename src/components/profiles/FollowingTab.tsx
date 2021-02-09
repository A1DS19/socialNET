import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Grid, Header, Tab } from 'semantic-ui-react';
import { listenUserFollowers, listenUserFollowings } from '../../actions/profile';
import {
  getFollowersCollection,
  getFollowingCollection,
} from '../../firestore/firestoreService';
import { StoreState } from '../../reducers';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { ProfileCard } from './ProfileCard';

interface Props {
  user: any;
  activeTab: number | string | undefined;
}

export const FollowingTab = ({ user, activeTab }: Props) => {
  const dispatch = useDispatch();
  const { followers, followings } = useSelector((state: StoreState) => state.profile);

  useFirestoreCollection({
    query:
      activeTab === 3
        ? () => getFollowersCollection(user.id)
        : () => getFollowingCollection(user.id),
    data: (data: any) =>
      activeTab === 3
        ? dispatch(listenUserFollowers(data))
        : dispatch(listenUserFollowings(data)),
    dependencies: [dispatch, activeTab],
  });

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width='16'>
          <Header
            floated='left'
            icon='user'
            content={activeTab === 3 ? 'Seguidores' : 'Siguiendo'}
          />
        </Grid.Column>
        <Grid.Column width='16'>
          <Card.Group itemsPerRow='5'>
            {activeTab === 3 &&
              followers.map((follower: any) => (
                <ProfileCard key={follower.id} profile={follower} />
              ))}
            {activeTab === 4 &&
              followings.map((follower: any) => (
                <ProfileCard key={follower.id} profile={follower} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};
