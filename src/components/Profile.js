import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../features/userSlice";
import * as BlogServices from "../service/api";

const Profile = () => {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const [detail, setUserDetail] = useState("");
  const[userNumber,setUserNumber] =useState("");
  const[userAddress, setUserAddress] = useState("");
  const[userName, setUserName] = useState("");
  const[userEmail, setUserEmail] = useState("");
  useEffect(() => {
    BlogServices.getUserDetail(userId)
      .then((res) => {
        console.log(res.data.data)
        setUserDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateUserDetail = () =>{
    const detail={
      name:userName,
      email:userEmail,
      phoneNumber:userNumber,
      address:userAddress
    }
    console.log(detail,'yo detail ho')
    BlogServices.updateUserDetail(userId,detail)
      .then((res) => {
        console.log(res.data.data)

      })
      .catch((err) => {
        console.log(err);
      });
  }

  const userDetail = (detail) => {
    console.log(detail);
    return (
      <div className="profile">
        <label>User Name:</label>
        <input placeholder={detail.name}onChange={(e) => setUserName(e.target.value)} ></input><br />
        <label>User Email:</label>
        <input placeholder={detail.email} onChange={(e) => setUserEmail(e.target.value)} ></input><br />
        <label>User Number:</label>
        <input placeholder={detail.phoneNumber}  onChange={(e) => setUserNumber(e.target.value)}></input><br />
        <label>User Address:</label>
        <input placeholder={detail.address} onChange={(e) => setUserAddress(e.target.value)} ></input>
        <button className="save-btn" onClick={updateUserDetail}>Save</button>
      </div>
    );
  };

  return <>{userDetail(detail)}</>;
};

export default Profile;
