import React from "react";

import axios from "axios";

import Post from './Post';
import { Row, Col, Button } from "reactstrap";
import { useHistory } from 'react-router-dom';
import Paths from "../../constants/paths";
function PostsList() {
  const [posts, setPosts] = React.useState([]);
  const history = useHistory();
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

  const createPost = () => history.push(Paths.CreatePost);

  return (
    <>
      <Row style={{ marginBottom: "24px" }}>
        <Col>
          <h3>Your Posts</h3>
        </Col>
        <Col style={{ textAlign: "end" }}>
          <Button onClick={createPost}>Create Post</Button>
        </Col>
      </Row>
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
