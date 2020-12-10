import React, { Component } from "react";
import axios from "axios";

import {Row, Col} from "reactstrap";

import EditorForm from "../Editor/EditorForm";
import SaveAlert from "../Alerts/Alerts";

import Paths from '../../constants/paths';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      isDraft: true,
      savedSuccess: null,
      showAlert: false,
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
      isDraft: false,
    };

    if (this.state.id === undefined) {
      axios
        .post("http://localhost:4000/posts/add", newPost)
        .then((res) => this.setState({ id: res.data.post._id }))
        .then(() => console.log(this.state));
    } else {
      axios
        .post(`http://localhost:4000/posts/update/${this.state.id}`, newPost)
        .then((res) => console.log(res.data));
    }

    this.props.history.push(Paths.PostsList);
  }

  onSave(content) {
    const newPost = {
      title: this.state.title,
      content: content,
      isDraft: this.state.isDraft,
    };

    if (this.state.id === undefined) {
      axios
        .post("http://localhost:4000/posts/add", newPost)
        .then((res) => this.setState({ id: res.data.post._id }))
        .then(() => this.setState({ savedSuccess: true, showAlert: true }))
        .then(() =>
          setTimeout(() => {
            this.setState({
              showAlert: false,
            });
          }, 2000)
        )
        .catch((err) => {
          console.log(err);
          this.setState({ savedSuccess: false, showAlert: true });
        });
    } else {
      axios
        .post(`http://localhost:4000/posts/update/${this.state.id}`, newPost)
        .then((res) => console.log(res.data))
        .then(() => this.setState({ savedSuccess: true, showAlert: true }))
        .then(() =>
          setTimeout(() => {
            this.setState({
              showAlert: false,
            });
          }, 2000)
        )
        .catch((err) => {
          console.log(err);
          this.setState({ savedSuccess: false, showAlert: true });
        });
    }
  }

  onDelete() {
    if (this.state.id === undefined) {
      this.props.history.push(Paths.PostsList);
    } else {
      axios
        .delete(`http://localhost:4000/posts/${this.state.id}`)
        .then(() => this.props.history.push(Paths.PostsList));
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h3>Create New Post</h3>
          </Col>
          <Col>
            <SaveAlert
              isSuccessful={this.state.savedSuccess}
              showAlert={this.state.showAlert}
            />
          </Col>
        </Row>
        <EditorForm
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
