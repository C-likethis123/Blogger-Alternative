import React from "react";
import { Link } from "react-router-dom";

import { Table } from "reactstrap";

import axios from "axios";

import Paths from '../../constants/paths';
import styled from 'styled-components';

const Post = (props) => (
  <tr>
    <td width="70%">
      {props.post.isDraft ? `${props.post.title} (draft)` : props.post.title}
    </td>
    <td width="10%">
      <Link to={`${Paths.EditPost}/${props.post._id}`}>Edit</Link>
    </td>
    <td width="10%">
      <Link onClick={() => props.deletePost(props.post._id)}>Delete</Link>
    </td>
    <td width="10%">
      <Link to={`${Paths.Post}/${props.post._id}`}>View</Link>
    </td>
  </tr>
);

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

  const Title = styled.h3`
    margin: 24px 0;
  `;

  return (
    <>
      <Title>Your Posts</Title>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((currentPost, i) => (
            <Post
              post={currentPost}
              key={i}
              deletePost={deletePost}
            />)
          )}
        </tbody>
      </Table>
    </>
  )
}

export default PostsList;
