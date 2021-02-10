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
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state: StoreState) => state.profile
  );
  let profile;

  useFirestoreDoc({
    query: () => getUserProfileData(userId),
    shouldExecute: match.params.id !== currentUser?.uid,
    data: (profile: any) => dispatch(ListenSelectedProfile(profile)),
    dependencies: [dispatch, userId],
  });

  if (match.params.id === currentUser?.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  if ((loading && !profile) || (!profile && !error)) return <LoaderComponent />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader user={profile} isCurrentUser={currentUser?.uid === profile?.id} />
        <ProfileContent user={profile} isCurrentUser={currentUser?.uid === profile?.id} />
      </Grid.Column>
    </Grid>
  );
};

export { ProfilePage };
