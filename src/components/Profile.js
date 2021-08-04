import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../features/userSlice";
import * as BlogServices from "../service/api";


const Profile = () => {
  const userId = useSelector(selectUserId);
  const [detail, setUserDetail] = useState("");
  const[userNumber,setUserNumber] =useState("");
  const[userAddress, setUserAddress] = useState("");
  const[userName, setUserName] = useState("");
  const[userEmail, setUserEmail] = useState("");
  useEffect(() => {
    BlogServices.getUserDetail(userId)
      .then((res) => {
        setUserDetail(res.data.data);
        setUserName(res.data.data.name);
        setUserAddress(res.data.data.address);
        setUserNumber(res.data.data.phoneNumber);
        setUserEmail(res.data.data.email);
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

    BlogServices.updateUserDetail(userId,detail)
      .then((res) => {
        setUserName(res.data.data.name);
        setUserAddress(res.data.data.address);
        setUserNumber(res.data.data.phoneNumber);
        setUserEmail(res.data.data.email);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  const userDetail = (detail) => {

    return (
      <div className="profile">
        <label>User Name:</label>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} ></input><br />
        <label>User Email:</label>
        <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} ></input><br />
        <label>User Number:</label>
        <input value={userNumber}  onChange={(e) => setUserNumber(e.target.value)}></input><br />
        <label>User Address:</label>
        <input value={userAddress} onChange={(e) => setUserAddress(e.target.value)} ></input>
        <button className="save-btn" onClick={updateUserDetail}>Save</button>
      </div>
    );
  };

  return <>{userDetail(detail)}</>;
};

export default Profile;
