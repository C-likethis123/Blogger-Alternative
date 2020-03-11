import React, { Component } from "react";
import { Link } from "react-router-dom";

import {Table} from "reactstrap";

import axios from "axios";

const Post = props => (
  <tr>
    <td>{props.post.title}</td>
    <td>
      <Link to={`/edit/${props.post._id}`}>Edit</Link>
    </td>
  </tr>
)

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/posts/")
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let posts = this.state.posts.map((currentPost, i) => {
      return <Post post={currentPost} key={i} />;
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
