import React from 'react';
import { Grid } from 'semantic-ui-react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileContent } from './ProfileContent';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../reducers';
import { RouteComponentProps } from 'react-router-dom';
import { AuthPayload } from '../../actions/auth';
import { LoaderComponent } from '../common/Loader';
import { useFirestoreDoc } from '../hooks/useFirestoreDoc';
import { getUserProfileData } from '../../firestore/firestoreService';
import { ListenSelectedProfile } from '../../actions/profile';

export interface MatchParams {
  id: string;
}

export interface UserDataProps {
  user: AuthPayload | null;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ProfilePage = ({ match }: Props): JSX.Element => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: StoreState) => state.loading);
  const { currentUser } = useSelector((state: StoreState) => state.auth);
  const { selectedUserProfile } = useSelector((state: StoreState) => state.profile);

  useFirestoreDoc({
    query: () => getUserProfileData(userId),
    data: (profile: any) => dispatch(ListenSelectedProfile(profile)),
    dependencies: [dispatch, userId],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <LoaderComponent />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          user={selectedUserProfile}
          isCurrentUser={currentUser?.uid === selectedUserProfile?.id}
        />
        <ProfileContent
          user={selectedUserProfile}
          isCurrentUser={currentUser?.uid === selectedUserProfile?.id}
        />
      </Grid.Column>
    </Grid>
  );
};

export { ProfilePage };
