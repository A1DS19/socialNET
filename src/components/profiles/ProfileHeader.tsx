import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import {
  clearFollowersData,
  setFollowUser,
  setUnFollowUser,
} from '../../actions/profile';
import {
  followUser,
  getFollowingDoc,
  unFollowUser,
} from '../../firestore/firestoreService';
import { StoreState } from '../../reducers';
interface Props {
  isCurrentUser: boolean;
  user: any;
}

const ProfileHeader = ({ user, isCurrentUser }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { followingUser } = useSelector((state: StoreState) => state.profile);

  useEffect(() => {
    if (isCurrentUser) return;
    setLoading(true);

    const fetchFollowingDoc = async () => {
      try {
        const followingDoc = await getFollowingDoc(user.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchFollowingDoc().then(() => {
      setLoading(false);
    });
    return () => {
      dispatch(clearFollowersData());
    };
  }, [dispatch, user.id, isCurrentUser]);

  const handleFollowUser = async () => {
    setLoading(true);
    try {
      await followUser(user);
      dispatch(setFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollowUser = async () => {
    setLoading(true);
    try {
      await unFollowUser(user);
      dispatch(setUnFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={user?.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: 'block', marginBottom: 10 }}
                  content={user?.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Seguidores' value={user?.followerCount || 0} />
            <Statistic label='Seguiendo' value={user?.followingCount || 0} />
          </Statistic.Group>
          {!isCurrentUser && (
            <Fragment>
              <Divider />
              <Reveal animated='move up'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button
                    fluid
                    color='teal'
                    content={followingUser ? 'Siguiendo' : 'No Siguiendo'}
                  />
                </Reveal.Content>

                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button
                    onClick={
                      followingUser
                        ? () => handleUnfollowUser()
                        : () => handleFollowUser()
                    }
                    loading={loading}
                    fluid
                    color={followingUser ? 'red' : 'green'}
                    content={followingUser ? 'Dejar de Seguir' : 'Seguir'}
                  />
                </Reveal.Content>
              </Reveal>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export { ProfileHeader };
