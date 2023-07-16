import React from "react";

import Post, { Post as PostType } from './Post';
import { Row, Col, Button } from "reactstrap";
import { useHistory } from 'react-router-dom';
import Paths from "../../constants/paths";
function PostsList() {
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const history = useHistory();
  React.useEffect(() => {
    fetch("/posts/")
      .then(response => response.json())
      .then((response) => setPosts(response))
      .catch((error) => console.log(error));
  }, []);

  const deletePost = (id: PostType['_id']) => {
    fetch(`/posts/${id}`, {
      method: 'DELETE'
    })
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
