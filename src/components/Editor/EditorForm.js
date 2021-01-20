import React from "react";
import { Editor } from "@toast-ui/react-editor";
import { Button, Input, FormGroup, Col } from "reactstrap";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import "tui-chart/dist/tui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
import useInterval from '@use-it/interval';

export default function EditorForm(props) {
  const editorRef = React.useRef();
  const [prevContent, setPrevContent] = React.useState(null);

  const getMarkdown = () => editorRef.current.getInstance().getMarkdown();
  const setMarkdown = (content) => editorRef.current.getInstance().setMarkdown(content);
  const onAutoSave = () => {
    const currContent = getMarkdown();
    if (prevContent !== currContent) {
      onSave();
    }
  };
  useInterval(onAutoSave, 6000);

  React.useEffect(() => {
    const content = props.content;
    setMarkdown(content);
    setPrevContent(content);
  }, [props.content]);

  const onSubmit = () => {
    const content = getMarkdown();
    props.onSubmit(content);
  };

  const onSave = () => {
    const content = getMarkdown();
    props.onSave(content);
    setPrevContent(content);
  };

  const chartOptions = {
    minWidth: 100,
    maxWidth: 600,
    minHeight: 100,
    maxHeight: 300,
  };

  const codeSyntaxHighlightOptions = { hljs };

  return (
    <React.Fragment>
      <FormGroup row>
        <Col>
          <Input
            type="text"
            onChange={props.onChangeTitle}
            placeholder="Post Title"
            value={props.title}
          />
        </Col>
        <Col xs="auto">
          <Button color="success" onClick={onSubmit}>
            {props.isEdit ? "Edit" : "Post"}
          </Button>{" "}
          <Button color="info" onClick={onSave}>
            Save
            </Button>{" "}
          <Button color="danger" onClick={props.onDelete}>
            Delete
          </Button>
        </Col>
      </FormGroup>
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        usageStatistics={false}
        plugins={[
          [chart, chartOptions],
          [codeSyntaxHighlight, codeSyntaxHighlightOptions],
          colorSyntax,
          tableMergedCell,
          uml,
        ]} />
    </React.Fragment>
  );
};
