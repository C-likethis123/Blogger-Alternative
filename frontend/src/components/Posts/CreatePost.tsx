import React from "react";
import axios from "axios";

import { Row, Col } from "reactstrap";

import EditorForm from "../Editor/EditorForm";
import SaveAlert, { notify } from "../Alerts/Alerts";

import Paths from '../../constants/paths';
import { useHistory } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const [id, setId] = React.useState(null);

  const history = useHistory();

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const onSubmit = (content: string) => {
    const newPost = {
      title,
      content,
      isDraft: false,
    };

    if (id) {
      axios
        .post(`/posts/update/${id}`, newPost)
        .then((res) => console.log(res.data));
    } else {
      axios
        .post("/posts/add", newPost)
        .then((res) => setId(res.data.post._id));
    }
    history.push(Paths.PostsList);
  }

  const onSave = (content: string) => {
    const newPost = {
      title,
      content,
      isDraft,
    };

    if (id) {
      axios
        .post(`/posts/update/${id}`, newPost)
        .then((res) => notify(true))
        .catch((err) => notify(false));
    } else {
      axios
        .post("/posts/add", newPost)
        .then((res) => {
          setId(res.data.post._id);
          notify(true);
        })
        .catch((err) => {
          console.log(err);
          notify(false);
        });
    }
  }

  const onDelete = () => {
    if (id) {
      axios
        .delete(`/posts/${id}`)
        .then(() => history.push(Paths.PostsList));
    } else {
      history.push(Paths.PostsList);
    };
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>Create Post</h3>
        </Col>
        <Col>
          <SaveAlert />
        </Col>
      </Row>
      <EditorForm
        isEdit={false}
        onSubmit={onSubmit}
        onChangeTitle={onChangeTitle}
        onDelete={onDelete}
        onSave={onSave}
      />
    </React.Fragment>
  );
}

export default CreatePost;
