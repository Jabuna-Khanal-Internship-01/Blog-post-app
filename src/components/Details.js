import React from "react";
import NavBar from "./Navbar";
import * as BlogServices from "../service/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetail, selectUserId, selectSignedIn } from "../features/userSlice";

const Detail = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const isSignedIn = useSelector(selectSignedIn);
  const [details, setDetails] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [comment, setComment] = useState("");
  const[titleId, setTitleId] =  useState("");

  useEffect(() => {
    BlogServices.getPostById(props.location.state)
      .then((res) => {
        console.log(res)
        dispatch(setDetail(res.comments));
        setDetails(res.comments);
        setTitleId(res.id);
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
  
  const postComment =() =>{
    BlogServices.addComment(titleId,{description:comment})
        .then((res) => {
          console.log(res)
          console.log("comment added successfully")
        })
        .catch((err) => {
          console.log(err);
        });
      }

  

  const renderDetail = (detail) => {
    const delComment =() =>{
        
      BlogServices.deleteComment(detail._id)
      .then((res) => {
       console.log("comment delete successfully")
      })
      .catch((err) => {
        console.log(err);
      });
    }
    const editComment =() =>{
      console.log('test')
    } 
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
      {isSignedIn ? (
        <>
          <div className="add-comment">
            <p className="comment-header">Add comment</p>
            <input
              className="comment-text"
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button className="save-btn" onClick={postComment}>Add</button>
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

      {isAuthor && <button onClick={deleteBlogPost}>delete</button>}
    </>
  );
};

export default Detail;
