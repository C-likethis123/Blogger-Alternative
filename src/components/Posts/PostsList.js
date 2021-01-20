import React from "react";

import axios from "axios";

import Title from '../Utils/Title';
import Post from './Post';

function PostsList() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/posts/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));
  }, []);

  const deletePost = (id) => {
    axios.delete(`/posts/${id}`)
      .then(() => setPosts(posts.filter((post) => post._id !== id)))
  };

  return (
    <>
      <Title>Your Posts</Title>
      {posts.map((currentPost) => (
        <Post
          post={currentPost}
          key={currentPost._id}
          deletePost={deletePost}
        />)
      )}
    </>
  )
}

export default PostsList;
