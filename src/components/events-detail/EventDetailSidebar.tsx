import React, { Fragment } from 'react';
import { Item, Segment } from 'semantic-ui-react';

const EventDetailSidebar = () => {
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        2 Personas Van
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          <Item style={{ position: 'relative' }}>
            <Item.Image size='tiny' src='/assets/user.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <span>Tom</span>
              </Item.Header>
            </Item.Content>
          </Item>
          <Item style={{ position: 'relative' }}>
            <Item.Image size='tiny' src='/assets/user.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <span>Bob</span>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Fragment>
  );
};

export { EventDetailSidebar };
