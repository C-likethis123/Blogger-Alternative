import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import { Viewer } from "@toast-ui/react-editor";

class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/posts/${this.props.match.params.id}`)
      .then(response => this.setState({ ...response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h3 className="view-post">{this.state.title}</h3>
        <Viewer initialValue={this.state.content}></Viewer>
      </div>
    );
  }
}

export default ShowPost;
