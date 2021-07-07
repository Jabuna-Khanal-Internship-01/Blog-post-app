import React, { useEffect, useState } from "react";
import * as BlogServices from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import {useHistory} from 'react-router-dom'

const Blogs = (props) => {
  const history = useHistory();
  const searchInput = useSelector(selectUserInput);
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BlogServices.getPostBySearchText(searchInput)
      .then((res) => {
        dispatch(setBlogData(res.data.data));
        setBlogs(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchInput]);

  const renderPost = (blog) => {

    return (
      <div className="blog">
        <h1 className ="blog-title">
          Title: {blog.title} 
          <a className="post-by">By :{blog.users.name}</a>
        </h1>
        <p className="post-des">Description: {blog.description}</p> <br />  
        <button onClick={()=>{history.push({
          pathname:'/details',
          state:blog._id})}} className="detail-btn">
          Details</button>
      </div>
    );
  };
 
  return (
    <div className="blogs">
      <div className="blogs-header">Total Post:  {blogs.length}</div>
      {loading ? <h1>loading....</h1> : ""}
      <div>{blogs.map((blog) => renderPost(blog))}</div>
    </div>
  );
};

export default Blogs;
