import { createSlice } from "@reduxjs/toolkit";

const  authSlice =  createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAdmin: false,
        loader: true,
        role: null,
        posts: [],
        mode: "light",
    },
    reducers: {
        setUserFromStorage(state, action) {
            state.user = action.payload;
          },
        userExist: (state, action) => {
            state.user = action.payload;
            state.loader=false;
            console.log("User set in state:", action.payload);

        },
        setRole(state, action){
            state.role = action.payload;
            console.log("Role set in state:", action.payload);
        },
        userNotExist:(state) => {
            state.user = null;
            state.loader=false;
        },
        setFriends: (state, action) => {
            if (state.user) {
              state.user.friends = action.payload.friends;
            } else {
              console.error("user friends non-existent :(");
            }
          },
          setPosts: (state, action) => {
            state.posts = action.payload.posts;
          },
          setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
              if (post._id === action.payload.post._id) return action.payload.post;
              return post;
            });
            state.posts = updatedPosts;
          },
          setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
          },

    },
});

export default authSlice;
export const {setUserFromStorage,setRole,userExist, userNotExist,setFriends,setPosts,setPost,setMode} = authSlice.actions;