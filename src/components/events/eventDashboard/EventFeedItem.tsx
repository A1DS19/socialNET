import React, { Fragment } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

interface Props {
  post: any;
}

export const EventFeedItem = ({ post }: Props) => {
  let summary: JSX.Element;

  switch (post.code) {
    case 'joined-event':
      summary = (
        <Fragment>
          <Link to={`/profile/${post.userUid}`}>
            {post.displayName} se unio a{' '}
            <Link to={`/events/${post.eventId}`}>{post.title}</Link>{' '}
          </Link>
        </Fragment>
      );
      break;
    case 'left-event':
      summary = (
        <Fragment>
          <Link to={`/profile/${post.userUid}`}>
            {post.displayName} se salio de{' '}
            <Link to={`/events/${post.eventId}`}>{post.title}</Link>{' '}
          </Link>
        </Fragment>
      );
      break;

    default:
      summary = <Fragment>Algo paso...</Fragment>;
  }
  return (
    <Feed.Event>
      <Feed.Label image={post.photoURL} />
      <Feed.Content>
        <Feed.Date>Hace {formatDistance(new Date(post.date), new Date())}</Feed.Date>
        <Feed.Summary>{summary}</Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
};
