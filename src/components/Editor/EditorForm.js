import React from "react";
import CustomEditor from "./CustomEditor";
import { Button, Input, FormGroup, Col } from "reactstrap";
import useInterval from '@use-it/interval';

export default function EditorForm(props) {
  const editorRef = React.useRef();
  const [prevContent, setPrevContent] = React.useState(null);

  const onAutoSave = () => {
    const currContent = editorRef.current.getValue();
    if (prevContent !== currContent) {
      onSave();
    }
  };
  useInterval(onAutoSave, 6000);

  React.useEffect(() => {
    const content = props.content;
    editorRef.current.getInstance().setMarkdown(content);
    setPrevContent(content);
  }, [props.content]);

  const onSubmit = () => {
    const content = editorRef.current.getValue();
    props.onSubmit(content);
  };

  const onSave = () => {
    const content = editorRef.current.getValue();
    props.onSave(content);
    setPrevContent(content);
  };

  return (
    <React.Fragment>
      <FormGroup row>
        <Col sm={9}>
          <Input
            type="text"
            onChange={props.onChangeTitle}
            placeholder="Post Title"
            value={props.title}
          />
        </Col>
        <div className="col ml-5" sm={1}>
          <Button color="success" sm={1} onClick={onSubmit}>
            {props.isEdit ? "Edit" : "Post"}
          </Button>{" "}
          <Button color="info" sm={1} onClick={onSave}>
            Save
            </Button>{" "}
          <Button color="danger" sm={1} onClick={props.onDelete}>
            Delete
          </Button>
        </div>
      </FormGroup>
      <CustomEditor ref={editorRef} />
    </React.Fragment>
  );
};
