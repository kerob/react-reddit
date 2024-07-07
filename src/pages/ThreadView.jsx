import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThread, useThreadUpdate } from '../providers/ThreadProvider';
import { convertDate } from '../util/Date';
import {
  FaThumbsDown,
  FaThumbsUp,
  FaPlus,
  FaMinus,
  FaRegEdit,
  FaReply,
  FaTrash,
  FaComment,
  FaCommentSlash,
} from 'react-icons/fa';
import { BsImageFill } from 'react-icons/bs';
import { ImArrowUp, ImArrowDown } from 'react-icons/im';
import IconBtn from '../components/IconBtn';
import { getComments, addComment, getThread } from '../firebase';
import { useAuth } from '../providers/AuthProvider';

function getReplies(id) {
  const threadData = useThread();
  return getComments(threadData.id, id);
}

function checkOrigPost(id) {
  const threadData = useThread();
  return id === threadData.userid;
}

export const threadLoader = async () => {
  const res = await useThread();
  return res;
};

export default function ThreadView() {
  const threadData = useThread();
  const navigate = useNavigate();
  const { id } = useParams();
  const [reply, setReply] = useState(false);
  const { currentUser } = useAuth();
  // console.log(getComments(threadData.id));
  const data = getThread(id);
  // useThreadUpdate(data);

  // useEffect(() => {
  //   console.log("thread render");
  //   const data = getThread(id);
  //   // const update = useThreadUpdate();
  //   // // update(data);
  //   // console.log(id);
  //   // console.log(data);
  //   // useThreadUpdate(data);
  // }, []);

  const handleImgClick = (e) => {
    console.log(e.target.getAttribute('data-expand'));

    let currentVal = e.target.getAttribute('data-expand');

    if (currentVal === 'false') {
      e.target.setAttribute('data-expand', 'true');
    } else {
      e.target.setAttribute('data-expand', 'false');
    }
  };

  const comments = getReplies(id);
  // console.log(threadData);

  return (
    <div>
      <div className="thread-view_op post-container flex-r">
        <div className="thread-view_rating">
          <IconBtn Icon={ImArrowUp} aria-label="Like" />
          <span>{threadData.rating}</span>
          <IconBtn Icon={ImArrowDown} aria-label="Dislike" />
        </div>

        <div className="thread-view_content">
          <h1>{threadData.title}</h1>

          <div className="thread-view_footer flex-r fs-200">
            <span className="fw-bold comment_poster comment_op">
              {threadData.user}
            </span>
            {/* <span>{convertDate(threadData.createdAt.seconds)}</span> */}
          </div>
          <div className="thread-view_message-content">
            {threadData.imageUrl ? (
              <img
                data-expand="false"
                className="thread-img"
                src={threadData.imageUrl}
                alt="image post"
                onClick={handleImgClick}
              />
            ) : (
              <div className="thread-img__placeholder">
                <BsImageFill />
              </div>
            )}
            <p>{threadData.content}</p>
          </div>
        </div>
      </div>
      <h3>Comments</h3>
      {reply && currentUser ? (
        <CommentForm
          parentid={id}
          animate={reply}
          closeHandler={() => setReply(false)}
        />
      ) : currentUser ? (
        <button
          class="btn-post-comment"
          aria-label="Login"
          onClick={() => setReply(true)}
        >
          Post Comment
        </button>
      ) : (
        <button
          class="btn-post-comment"
          aria-label="Login"
          onClick={() => navigate('/login')}
        >
          Log in to reply
        </button>
      )}
      <CommentList comments={comments} />
    </div>
  );
}

function ThreadSidebar() {
  return <div className="thread-sidebar"></div>;
}

function CommentList({ comments }) {
  /* Container for thread comments */

  return (
    <div className="commentlist">
      {comments &&
        comments.map((comment) => <Comment data={comment} key={comment.id} />)}
    </div>
  );
}

function Comment(props) {
  const { id, user, userid, rating, content, lastUpdated } = props.data;
  const [reply, setReply] = useState(false);
  const [showPost, setShowPost] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const comments = getReplies(id);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function toggleComments(state) {
    if (comments.length > 0) {
      setShowComments(state);
    }
  }

  return (
    <div className="comment_container flex-r">
      <button
        className="comment_toggle"
        onClick={() => setShowPost((prevState) => !prevState)}
      >
        {showPost ? <FaMinus /> : <FaPlus />}
      </button>
      {showPost ? (
        <div className="comment_data">
          <div className="comment flex-r">
            <div className="comment_rating">
              <IconBtn Icon={ImArrowUp} aria-label="Like" />
              <span>{rating}</span>
              <IconBtn Icon={ImArrowDown} aria-label="Dislike" />
            </div>
            <div className="comment_post">
              <div className="comment_header flex-r fs-200">
                <span
                  className={`fw-bold comment_poster ${
                    currentUser &&
                    currentUser.uid === userid &&
                    'comment_current-user'
                  }
                  
                  ${checkOrigPost(userid) && 'comment_op'}`}
                >
                  {user}
                </span>
                <span>{convertDate(lastUpdated.seconds)}</span>
              </div>
              <div className="comment_content">{content}</div>
              <div className="comment_footer flex">
                {/* <IconBtn Icon={FaThumbsUp} aria-label="Like" />
            <IconBtn Icon={FaThumbsDown} aria-label="Dislike" /> */}
                <IconBtn
                  Icon={FaReply}
                  func={() =>
                    currentUser
                      ? setReply((prevState) => !prevState)
                      : navigate('/login')
                  }
                  aria-label="Reply"
                />
                {showComments ? (
                  <IconBtn
                    Icon={FaCommentSlash}
                    func={() => toggleComments(false)}
                    aria-label="Hide Comments"
                  />
                ) : (
                  <IconBtn
                    Icon={FaComment}
                    func={() => toggleComments(true)}
                    aria-label="Show Comments"
                  />
                )}
                {userid === 'formposter' && (
                  <>
                    <IconBtn Icon={FaTrash} aria-label="Delete" />
                    <IconBtn Icon={FaRegEdit} aria-label="Edit" />
                  </>
                )}
              </div>
            </div>
          </div>
          {reply && (
            <CommentForm
              parentid={id}
              animate={reply}
              closeHandler={() => setReply(false)}
            />
          )}
          {comments.length > 0 &&
            (showComments ? (
              <div className="comment_replies-container flex-r">
                {/* <button
              className="replies_close-btn"
              aria-label="Hide Comments"
              onClick={() => setShowComments(false)}
            /> */}
                <CommentList comments={comments} />
              </div>
            ) : (
              <button onClick={() => setShowComments(true)}>
                Load Comments
              </button>
            ))}
        </div>
      ) : (
        <div className="comment_hidden">
          <div className="comment_header flex-r fs-200">
            <span className="fw-bold">{user}</span>
            <span>{convertDate(lastUpdated.seconds)}</span>
            <span>{comments.length} children</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CommentForm({ parentid, animate, closeHandler }) {
  const threadData = useThread();
  let formVal = useRef();
  const { currentUser } = useAuth();

  const mountedStyle = {
    animation: 'inAnimation 250ms ease-in',
  };
  const unmountedStyle = {
    animation: 'outAnimation 270ms ease-out',
    animationFillMode: 'forwards',
  };

  return (
    <div
      // data-visible={animate ? "true" : "false"}
      className="flex-r comment_form"
      style={animate ? mountedStyle : unmountedStyle}
    >
      <textarea ref={formVal}></textarea>
      <button
        aria-label="Send Reply"
        className="comment_form-button"
        onClick={() => {
          addComment(
            threadData.id,
            formVal.current.value,
            currentUser.displayName,
            currentUser.uid,
            parentid
          );
          formVal.current.value = '';
          closeHandler();
        }}
      >
        Reply
      </button>
      <button onClick={() => closeHandler()}>Cancel</button>
    </div>
  );
}
