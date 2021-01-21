import React from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

import EditorForm from "../Editor/EditorForm";
import SaveAlert, { notify } from "../Alerts/Alerts";

import Paths from '../../constants/paths';
import { useParams, useHistory } from "react-router-dom";

function EditPost() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isDraft, setIsDraft] = React.useState(true);
  const history = useHistory();
  const { id } = useParams();

  React.useState(() => {
    axios
      .get(`/posts/${id}`)
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
        `/posts/update/${id}`,
        newPost
      );

    history.push(Paths.PostsList);
  }

  const onDelete = () => {
    axios
      .delete(`/posts/${id}`)
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
        `/posts/update/${id}`,
        newPost
      )
      .then(() => notify(true))
      .catch((err) => {
        console.log(err);
        notify(false);
      });
  }

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h3>Edit Post</h3>
        </Col>
        <Col>
          <SaveAlert />
        </Col>
      </Row>
      <EditorForm
        title={title}
        content={content}
        isEdit
        onSubmit={onSubmit}
        onChangeTitle={onChangeTitle}
        onDelete={onDelete}
        onSave={onSave}
      />
    </React.Fragment>
  );
}

export default EditPost;
