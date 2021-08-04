import React from "react";
import NavBar from "./Navbar";
import * as BlogServices from "../service/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetail,
  selectSignedIn,
} from "../features/userSlice";
import * as localStorageData from "../utils/userData";

const Detail = (props) => {
  const dispatch = useDispatch();
  const userId = localStorageData.getUserId();
  const isSignedIn = useSelector(selectSignedIn);
  const [details, setDetails] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [comment, setComment] = useState("");
  const [titleId, setTitleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isEditPost, setEditPost] = useState(false);
  const [isEditComment, setEditComment] = useState(false);
  const [commentDes, setCommentDes] = useState("");

  useEffect(() => {
    BlogServices.getPostById(props.location.state)
      .then((res) => {
        dispatch(setDetail(res.comments));
        setDetails(res.comments);
        setTitleId(res.id);
        setTitle(res.title);
        setAuthorName(res.users.name);
        setDes(res.description);
        const canEdit = userId !== "" && userId === res.users._id;
        setIsAuthor(canEdit);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editPost = () => {
    setEditPost(true);
  };
  const updatePost = () => {
    const post = {
      title: title,
      description: description,
    };
    BlogServices.updatePost(titleId, post)
      .then((res) => {

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelUpdate = () => {
    setEditPost(false);
  };

  const deleteBlogPost = () => {
    BlogServices.deletePost(props.location.state)
      .then((res) => {
        console.log(res,"deleted post");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postComment = () => {
    BlogServices.addComment(titleId, { description: comment })
      .then((res) => { 
        console.log(res,'postcomment');      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderDetail = (detail) => {
  
    const delComment = () => {
      BlogServices.deleteComment(detail._id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const clickedEdit = () => {
      setEditComment(true);
    };

    const cancelEditComment = () => {
      setEditComment(false);
    };
    const editComment = () => {
      BlogServices.updateComment(titleId, { description: comment })
        .then((res) => {
          console.log(res, "---");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <>
        {isAuthor ? (
          <div className="blog">
            <p className="blog-title">Comment: {detail.description}</p>
            <a className="post-by">By:{detail.users.name}</a>
            {userId === detail.users._id ? (
              <>
                <button onClick={clickedEdit} className="save-btn">
                  Edit
                </button>
                {isEditComment && (
                  <>
                    <input
                      value={commentDes}
                      onChange={(e) => setCommentDes(e.target.value)}
                    ></input>
                    <button onClick={editComment} className="save-btn">
                      Save
                    </button>
                    <button onClick={cancelEditComment} className="cancel-btn">
                      Cancel
                    </button>
                  </>
                )}
                <button onClick={delComment} className="cancel-btn">
                  Delete
                </button>
              </>
            ) : (
              <button onClick={delComment} className="cancel-btn">
                Delete
              </button>
            )}
          </div>
        ) : (
          <div className="blog">
            <p className="blog-title">{detail.description}</p>
            <a className="post-by">By:{detail.users.name}</a>
            {userId === detail.users._id && (
              <>
                <button onClick={clickedEdit} className="save-btn">
                  Edit
                </button>
                {isEditComment && (
                  <>
                    <input
                      value={commentDes}
                      onChange={(e) => setDes(e.target.value)}
                    ></input>
                    <button onClick={editComment} className="save-btn">
                      Save
                    </button>
                    <button onClick={cancelEditComment} className="cancel-btn">
                      Cancel
                    </button>
                  </>
                )}
                <button onClick={delComment} className="cancel-btn">
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <NavBar />
      {isEditPost && (
        <div className="update">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br />
          <input
            value={description}
            onChange={(e) => setDes(e.target.value)}
          ></input>
          <br />
          <button onClick={updatePost} className="save-btn">
            Update
          </button>
          <button onClick={cancelUpdate} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}

      {isSignedIn ? (
        <>
          <div className="add-comment">
            <p className="comment-header">Add comment</p>
            <input
              className="comment-text"
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button className="save-btn" onClick={postComment}>
              Add
            </button>
          </div>
          <div className="blog">
            <p className="blog-title">Title: {title}</p>
            <p className="blog-title">Description: {description}</p>
            <a className="post-by">By:{authorName}</a>
            {isAuthor && (
              <>
                <button onClick={editPost} className="save-btn">
                  Edit
                </button>
                <button onClick={deleteBlogPost} className="cancel-btn">
                  Delete
                </button>
              </>
            )}
          </div>

          <div className="blogs">
            <div className="blogs-header">Comments: {details.length}</div>
            <div>{details.map((detail) => renderDetail(detail))}</div>
          </div>
        </>
      ) : (
        <div className="blogs">
          <div className="blogs-header">Comments: {details.length}</div>
          <div>{details.map((detail) => renderDetail(detail))}</div>
        </div>
      )}
    </>
  );
};

export default Detail;
