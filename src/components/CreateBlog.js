import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BlogServices from "../service/api";
import { selectUserId } from "../features/userSlice";

const CreateBlog = () => {
  const [inputTitle, setTitle] = useState("");
  const [inputDes, setDes] = useState("");
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const postBlog = (e) => {
    e.preventDefault();
    setTitle(inputTitle);
    setDes(inputDes);

    const post ={
        title:inputTitle,
        description:inputDes ,
        users:{_id:userId}
    }

    BlogServices.createPost(post)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const cancelBlogPost = (e) => {
    e.preventDefault();
    setTitle("");
    setDes("");
  };

  return (
    <>
      <div className="addBlog">
        <input
          className="addedBlog"
          value={inputTitle}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        ></input> <br />
        <input
          className="addedDes"
          value={inputDes}
          placeholder="Enter description of Blog"
          onChange={(e) => setDes(e.target.value)}
        ></input> <br />
        <button className="cancel-btn" onClick={cancelBlogPost}>
          cancel{" "}
        </button> 
        <button className="save-btn" onClick={postBlog}>
          Save
        </button>
      </div>
    </>
  );
};

export default CreateBlog;
