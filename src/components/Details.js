import React from "react";
import NavBar from "./Navbar";
import * as BlogServices from "../service/api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetail, selectUserId } from "../features/userSlice";

const Detail = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [posterId, setPosterId] = useState("");
  const [details, setDetails] = useState([]);


  useEffect(() => {
    BlogServices.getPostById(props.location.state)
      .then((res) => {
        dispatch(setDetail(res.comments));
        setDetails(res.comments);
        setPosterId(res.users._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderDetail = (detail) => {
      return (
        <div className="blog">
          <p className="blog-title">{detail.description}</p>
          <a className="post-by">By:{detail.users.name}</a>
        </div>
      );
    };

  return (
    <>
      <NavBar />
      <div className="blogs">
        <div className="blogs-header">Comments: {details.length}</div>
        <div>{details.map((detail) => renderDetail(detail))}</div>
      </div>
    </>
  );
};

export default Detail;
