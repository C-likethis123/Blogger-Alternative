import React from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

import EditorForm from "../Editor/EditorForm";
import SaveAlert from "../Alerts/Alerts";

import Paths from '../../constants/paths';
import { useParams, useHistory } from "react-router-dom";

function EditPost() {
  const [savedSuccess, setSavedSuccess] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const history = useHistory();
  const { id } = useParams();

  React.useState(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then(({ data: { title, content, isDraft } }) => {
        setTitle(title);
        setContent(content);
        setIsDraft(isDraft);
      })
      .catch((error) => console.log(error));
  }, []);

  const onChangeTitle = (e) => setTitle(e.target.value);

  const onSubmit = (content) => {
    const newPost = {
      title,
      content,
      isDraft: false,
    };

    axios
      .post(
        `http://localhost:4000/posts/update/${id}`,
        newPost
      );

    history.push(Paths.PostsList);
  }

  const onDelete = () => {
    axios
      .delete(`http://localhost:4000/posts/${id}`)
      .then(() => history.push(Paths.PostsList));
  }

  const onSave = (content) => {
    const newPost = {
      title,
      content: content,
      isDraft,
    };
    axios
      .post(
        `http://localhost:4000/posts/update/${id}`,
        newPost
      )
      .then((res) => {
        setSavedSuccess(true);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setSavedSuccess(false);
        setShowAlert(true);
      });
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>Edit Post</h3>
        </Col>
        <Col>
          <SaveAlert
            isSuccessful={savedSuccess}
            showAlert={showAlert}
          />
        </Col>
      </Row>
      <EditorForm
        title={title}
        content={content}
        isEdit={true}
        onSubmit={onSubmit}
        onChangeTitle={onChangeTitle}
        onDelete={onDelete}
        onSave={onSave}
      />
    </React.Fragment>
  );
}

export default EditPost;
