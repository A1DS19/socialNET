import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';

interface HomePageProps extends RouteComponentProps {}

const HomePage = ({ history }: HomePageProps) => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' style={{ marginBottom: 12 }} />
          socialNET
        </Header>
        <Button size='huge' inverted onClick={() => history.push('/events')}>
          Inicia <Icon name='arrow right' inverted />{' '}
        </Button>
      </Container>
    </Segment>
  );
};

export { HomePage };
