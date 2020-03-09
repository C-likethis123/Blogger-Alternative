import React, { Component } from "react";
import axios from "axios";

import TextEditor from "./TextEditor";

class CreateToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState({ title });
  }

  onSubmit(content) {
    const newPost = Object.assign(this.state, {content: content});
    axios
      .post("http://localhost:4000/posts/add", newPost)
      .then(res => console.log(res.data));

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h3>Create New ToDo</h3>
        <TextEditor
          isEdit={false}
          onSubmit={this.onSubmit}
          onChangeTitle={this.onChangeTitle}
        />
      </div>
    );
  }
}

export default CreateToDo;
