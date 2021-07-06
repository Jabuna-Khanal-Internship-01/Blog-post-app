import React from "react";
import NavBar from "./Navbar";
import * as BlogServices from "../service/api";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { setDetail } from "../features/userSlice";

const Detail = (props) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState([]);
   
    BlogServices.getPostById(props.location.state)
      .then((res) => {
        dispatch(setDetail(res));
        setDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });

 const renderDetail =(detail) =>{
   return(
     <div className="blog">
    <p className="blog-title">{detail.description}</p>
    <a className="post-by">By:{detail.users.name}</a>
    </div>
   )
  }

  return (
    <>
      <NavBar />
      <createBlog />  
      <div className="blogs">
      <div className="blogs-header">Comments:  {details.length}</div>
      <div>{details.map((detail) => renderDetail(detail))}</div>
    </div>
    </>
  );
};

export default Detail;
