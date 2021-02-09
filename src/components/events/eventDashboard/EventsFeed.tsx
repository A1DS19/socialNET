import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feed, Header } from 'semantic-ui-react';
import { listenUserNewsFeed } from '../../../actions/profile';
import {
  firebaseObjectToArray,
  getUserNewsFeedRef,
} from '../../../firestore/firebaseService';
import { StoreState } from '../../../reducers';
import { EventFeedItem } from './EventFeedItem';

export const EventsFeed = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((state: StoreState) => state.profile);

  useEffect(() => {
    getUserNewsFeedRef().on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      const feed = firebaseObjectToArray(snapshot.val())?.reverse();

      dispatch(listenUserNewsFeed(feed));
    });

    return () => {
      getUserNewsFeedRef().off();
    };
  }, [dispatch]);

  return (
    <Fragment>
      {feed.length > 0 && (
        <Fragment>
          <Header attached color='teal' icon='newspaper' content='Noticias' />
          <Feed>
            {feed.map((post: any) => (
              <EventFeedItem key={post.id} post={post} />
            ))}
          </Feed>
        </Fragment>
      )}
    </Fragment>
  );
};
