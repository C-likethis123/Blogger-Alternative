import React from "react";
import axios from "axios";

import { Row, Col } from "reactstrap";

import EditorForm from "../Editor/EditorForm";
import SaveAlert from "../Alerts/Alerts";

import Paths from '../../constants/paths';
import { useHistory } from "react-router-dom";

function CreatePost(props) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const [savedSuccess, setSavedSuccess] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [id, setId] = React.useState(null);

  const history = useHistory();

  const onChangeTitle = (e) => setTitle(e.target.value);

  const onSubmit = (content) => {
    const newPost = {
      title,
      content,
      isDraft: false,
    };

    if (id) {
      axios
        .post(`http://localhost:4000/posts/update/${id}`, newPost)
        .then((res) => console.log(res.data));
    } else {
      axios
        .post("http://localhost:4000/posts/add", newPost)
        .then((res) => setId(res.data.post._id));
    }
    history.push(Paths.PostsList);
  }

  const onSave = (content) => {
    const newPost = {
      title,
      content,
      isDraft,
    };

    if (id) {
      axios
        .post(`http://localhost:4000/posts/update/${id}`, newPost)
        .then((res) => {
          console.log(res.data);
          setSavedSuccess(true);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2000);
        })
        .catch((err) => {
          console.log(err);
          setSavedSuccess(false);
          setShowAlert(true);
        });
    } else {
      axios
        .post("http://localhost:4000/posts/add", newPost)
        .then((res) => {
          setId(res.data.post._id);
          setSavedSuccess(true);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2000)
        })
        .catch((err) => {
          console.log(err);
          setSavedSuccess(false);
          setShowAlert(true);
        });
    }
  }

  const onDelete = () => {
    if (id) {
      axios
        .delete(`http://localhost:4000/posts/${id}`)
        .then(() => history.push(Paths.PostsList));
    } else {
      history.push(Paths.PostsList);
    };
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>Create New Post</h3>
        </Col>
        <Col>
          <SaveAlert
            isSuccessful={savedSuccess}
            showAlert={showAlert}
          />
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
