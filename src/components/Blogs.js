 import React ,{useEffect, useState} from 'react';
 import axios from 'axios';
 import * as BlogServices from "../service/api"

 import { useDispatch, useSelector } from 'react-redux';
 import { selectUserInput, setBlogData } from '../features/userSlice';



 const Blogs =() =>{
     const searchInput = useSelector(selectUserInput);
    const dispatch = useDispatch();
    const[blogs,setBlogs] =useState();
    const [loading, setLoading] =useState(true);


    useEffect(()=>{
      BlogServices.getPostBySearchText(searchInput).then((res)=>{
            dispatch(setBlogData(res.data));
            setBlogs(res.data);
            console.log(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[searchInput]);


     return (
     <div className="blogs">
         <span></span>
     </div>
    )
 }





 export default Blogs;