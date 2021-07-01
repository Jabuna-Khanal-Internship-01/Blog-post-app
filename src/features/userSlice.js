import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userData: null,
    blogData: null,
    searchInput :"",
  },
  reducers: {
    setSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    setInput: (state, action) => {
        state.searchInput= action.payload;
      },
  },  
});

export const { setSignedIn, setUserData, setBlogData,setInput } = userSlice.actions;

export const selectSignedIn =(state) => state.user.isSignedIn;
export const selectUserData =(state) => state.user.userData;
export const selectBlogData =(state) => state.user.blogData;
export const selectUserInput =(state) => state.user.searchInput ;


export default userSlice.reducer;