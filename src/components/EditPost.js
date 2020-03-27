import React, { Component } from "react";
import axios from "axios";

import TextEditor from "./TextEditor";

class EditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      isDraft: true
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/posts/${this.props.match.params.id}`)
      .then(response => this.setState({ ...response.data }))
      .catch(error => console.log(error));
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState({ title });
  }

  onSubmit(content) {
    const newPost = {
      title: this.state.title,
      content: content,
      isDraft: false
    };
    axios
      .post(
        `http://localhost:4000/posts/update/${this.props.match.params.id}`,
        newPost
      )
      .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  onDelete() {
    axios
      .delete(`http://localhost:4000/posts/${this.props.match.params.id}`)
      .then(() => this.props.history.push("/"));
  }

  onSave(content) {
    const newPost = {
      title: this.state.title,
      content: content,
      isDraft: this.state.isDraft
    };
    axios
      .post(
        `http://localhost:4000/posts/update/${this.props.match.params.id}`,
        newPost
      )
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div>
        <h3>Edit Post</h3>
        <TextEditor
          title={this.state.title}
          content={this.state.content}
          isEdit={true}
          onSubmit={this.onSubmit}
          onChangeTitle={this.onChangeTitle}
          onDelete={this.onDelete}
          onSave={this.onSave}
        />
      </div>
    );
  }
}

export default EditPost;
