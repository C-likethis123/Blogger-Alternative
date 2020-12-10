import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Table } from "reactstrap";

import axios from "axios";

import Paths from '../../constants/paths';

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

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/posts/")
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.posts.length === 0) {
      axios
        .get("http://localhost:4000/posts/")
        .then((response) => {
          this.setState({ posts: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  deletePost = (id) => {
    axios.delete(`http://localhost:4000/posts/${id}`).then(() =>
      this.setState((prevState, prevProps) => {
        return {
          posts: prevState.posts.filter((post) => post._id !== id),
        };
      })
    );
  };

  render() {
    let posts = this.state.posts.map((currentPost, i) => {
      return <Post post={currentPost} key={i} deletePost={this.deletePost} />;
    });

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{posts}</tbody>
        </Table>
      </div>
    );
  }
}

export default PostsList;
