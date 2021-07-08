import React from "react";
import NavBar from "./Navbar";
import * as BlogServices from "../service/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetail,
  selectUserId,
  selectSignedIn,
  setUserData,
} from "../features/userSlice";

const Detail = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const isSignedIn = useSelector(selectSignedIn);
  const [details, setDetails] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [comment, setComment] = useState("");
  const [titleId, setTitleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    BlogServices.getPostById(props.location.state)
      .then((res) => {
        console.log(res);
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



  const deleteBlogPost = () => {
    BlogServices.deletePost(props.location.state)
      .then((res) => {
        console.log("deleted post");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postComment = () => {
    BlogServices.addComment(titleId, { description: comment })
      .then((res) => {
        console.log(res, "---");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPost =() =>{
    setEdit(true);
  }

  const updatePost =()=>{
    const post ={
      title:title,
      description:description,
    }
    BlogServices.updatePost(titleId,post).then ((res)=>{
      
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const cancelUpdate =() =>{
    setEdit(false)
  }


  console.log(details);
  const renderDetail = (detail) => {
    const delComment = () => {
      BlogServices.deleteComment(detail._id)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    };
    const editComment = () => {
      
    };


    return (
      <>
        {isAuthor ? (
          <div className="blog">
            <p className="blog-title">{detail.description}</p>
            <a className="post-by">By:{detail.users.name}</a>
            <button onClick={editComment}>Edit</button>
            <button onClick={delComment}>Delete</button>
          </div>
        ) : (
          <div className="blog">
            <p className="blog-title">{detail.description}</p>
            <a className="post-by">By:{detail.users.name}</a>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <NavBar />
      {isEdit && (
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
          <button onClick={updatePost} className="save-btn">Update</button>
          <button onClick={cancelUpdate} className="cancel-btn">Cancel</button>
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
                <button onClick={editPost}>Edit</button>
                <button onClick={deleteBlogPost}>delete</button>
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
