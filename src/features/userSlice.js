import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userData: null,
    blogData: null,
    searchInput: "",
    postDetail: "",
    userId:"",
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
      state.searchInput = action.payload;
    },
    setDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    setUserId:(state, action) => {
      state.userId= action.payload;
    },
  },
});

export const { setSignedIn, setUserData, setBlogData, setInput, setDetail , setUserId} =
  userSlice.actions;

export const selectSignedIn = (state) => state.user.isSignedIn;
export const selectUserData = (state) => state.user.userData;
export const selectBlogData = (state) => state.user.blogData;
export const selectUserInput = (state) => state.user.searchInput;
export const selectDetail = (state) => state.user.postDetail;
export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;

