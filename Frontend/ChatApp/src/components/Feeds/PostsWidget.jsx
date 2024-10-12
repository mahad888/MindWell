import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../Redux/reducers/auth";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const {posts} = useSelector((state) => state.auth); // Correctly getting posts from state

  const getPosts = async () => {
    try {
      const token = localStorage.getItem("auth");
      console.log("Token:", token);

      const response = await axios.get("http://localhost:5000/api/feed/posts", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data)
      dispatch(setPosts({ posts:data })); // Updating Redux store with posts
      console.log("Fetched posts:", posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getUserPosts = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.get(
        `http://localhost:5000/api/${userId}/posts`, // Corrected URL
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const posts = response.data;
      dispatch(setPosts({ posts })); // Updating Redux store with user-specific posts
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  // Fetch posts only on mount and when `isProfile` or `userId` changes
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId]); // Only run when these dependencies change

  return (
    <>
      {/* Log posts in the return JSX to verify state */}
      {console.log("Posts in return statement:", posts)}

      {/* Check if posts exist and render them */}
      {posts && posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            name,
            description,
            location,
            post,
            avatar,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={name}
              description={description}
              location={location}
              picturePath={post?.url} // Ensure post object exists
              userPicturePath={avatar?.url} // Ensure avatar object exists
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <p>No posts available</p> // Fallback message if no posts are found
      )}
    </>
  );
};

export default PostsWidget;
