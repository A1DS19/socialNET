import React, { Fragment } from 'react';
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
import { UserDataProps } from './ProfilePage';

interface Props {
  isCurrentUser: boolean;
}

const ProfileHeader = ({ user, isCurrentUser }: UserDataProps & Props) => {
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
            <Statistic label='Seguidores' value={10} />
            <Statistic label='Seguiendo' value={5} />
          </Statistic.Group>
          {!isCurrentUser && (
            <Fragment>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button fluid color='teal' content='Siguiendo' />
                </Reveal.Content>

                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button fluid color='red' content='Dejar de Seguir' />
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
