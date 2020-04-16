import React, { Component } from "react";
import axios from "axios";

import TextEditor from "./TextEditor";

class CreatePost extends Component {
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

    if (this.state.id === undefined) {
      axios
        .post("http://localhost:4000/posts/add", newPost)
        .then(res => this.setState({ id: res.data.post._id }))
        .then(() => console.log(this.state));
    } else {
      axios
        .post(`http://localhost:4000/posts/update/${this.state.id}`, newPost)
        .then(res => console.log(res.data));
    }

    this.props.history.push("/");
  }

  onSave(content) {
    const newPost = {
      title: this.state.title,
      content: content,
      isDraft: this.state.isDraft
    };
    
    if (this.state.id === undefined) {
      axios
        .post("http://localhost:4000/posts/add", newPost)
        .then(res => this.setState({ id: res.data.post._id }))
        .then(() => console.log(this.state));
    } else {
      axios
        .post(`http://localhost:4000/posts/update/${this.state.id}`, newPost)
        .then(res => console.log(res.data));
    }
  }

  onDelete() {
    if (this.state.id === undefined) {
      this.props.history.push("/");
    } else {
      axios
        .delete(`http://localhost:4000/posts/${this.state.id}`)
        .then(() => this.props.history.push("/"));
    }
  }

  render() {
    return (
      <div>
        <h3>Create New Post</h3>
        <TextEditor
          isEdit={false}
          onSubmit={this.onSubmit}
          onChangeTitle={this.onChangeTitle}
          onDelete={this.onDelete}
          onSave={this.onSave}
        />
      </div>
    );
  }
}

export default CreatePost;