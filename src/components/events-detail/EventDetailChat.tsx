import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Comment, Header, Segment } from 'semantic-ui-react';
import { clearEventsChat, listenToEventsChat } from '../../actions/event';
import { firebaseObjectToArray, getEventChatRef } from '../../firestore/firebaseService';
import { StoreState } from '../../reducers';
import { EventChatForm } from './EventChatForm';
import { createDataTree } from '../../scripts/util';
//es como decir hace un minuto o hace una hora y asi
//para eso es el formatDistance
import { formatDistance } from 'date-fns';

interface Props {
  eventId: string | undefined;
}

const EventDetailChat = ({ eventId }: Props) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state: StoreState) => state.events);
  const [showReplyForm, setReplyForm] = useState({ open: false, commentId: null });
  const [showReplies, setShowReplies] = useState({ open: false, childId: null });

  useEffect(() => {
    getEventChatRef(eventId).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(listenToEventsChat(firebaseObjectToArray(snapshot.val())));
    });
    //onUnmount se limpia el state con el cleanup func de useEffect
    return () => {
      dispatch(clearEventsChat());
      getEventChatRef().off();
    };
  }, [dispatch, eventId]);

  const handleCloseReplyForm = (): void => {
    setReplyForm({ open: false, commentId: null });
  };

  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat Acerca de este Evento</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {createDataTree(comments).map((comment: any) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoUrl || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split('\n').map((text: string, i: number) => (
                    <span key={i}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setReplyForm({ open: !showReplyForm.open, commentId: comment.id })
                    }
                  >
                    Reply
                  </Comment.Action>
                  <Comment.Action
                    onClick={() =>
                      setShowReplies({ open: !showReplies.open, childId: comment.id })
                    }
                  >
                    {'Ver Replies'}
                  </Comment.Action>
                  {showReplyForm.open && showReplyForm.commentId === comment.id && (
                    <EventChatForm
                      eventId={eventId}
                      parentId={comment.id}
                      closeForm={handleCloseReplyForm}
                    />
                  )}
                </Comment.Actions>
              </Comment.Content>
              {showReplies.open &&
                showReplies.childId === comment.id &&
                comment.childNodes?.length > 0 && (
                  <Comment.Group>
                    {comment.childNodes?.map((child: any) => (
                      <Comment key={child.id}>
                        <Comment.Avatar src={child.photoUrl || '/assets/user.png'} />
                        <Comment.Content>
                          <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                            {child.displayName}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>{formatDistance(child.date, new Date())}</div>
                          </Comment.Metadata>
                          <Comment.Text>
                            {child.text.split('\n').map((text: string, i: number) => (
                              <span key={i}>
                                {text}
                                <br />
                              </span>
                            ))}
                          </Comment.Text>
                        </Comment.Content>
                      </Comment>
                    ))}
                  </Comment.Group>
                )}
            </Comment>
          ))}
        </Comment.Group>
        <EventChatForm eventId={eventId} parentId={0} />
      </Segment>
    </Fragment>
  );
};

export { EventDetailChat };
