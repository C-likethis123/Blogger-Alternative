import React, { Component } from "react";

import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.min.css";
import "tui-editor/dist/tui-editor-contents.min.css";
import { Editor } from "@toast-ui/react-editor";

import 'tui-editor/dist/tui-editor-extScrollSync'
import 'tui-editor/dist/tui-editor-extColorSyntax'
import 'tui-editor/dist/tui-editor-extUML'
import 'tui-editor/dist/tui-editor-extChart'
import 'tui-editor/dist/tui-editor-extTable'

import 'tui-color-picker/dist/tui-color-picker.css';

import { Button, Input, FormGroup, Col } from "reactstrap";

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  /* 
    needed as the props updates after the first render because of EditToDo's asynchronous data 
    fetching operation during its
    componentDidMount method. The second render provided the actual content of the blog post. 
  */ 
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content !== this.props.content) {
      this.editorRef.current.getInstance().setMarkdown(this.props.content);
    }
  }

  onSubmit = () => {
    const content = this.editorRef.current.getInstance().getValue();
    this.props.onSubmit(content);
  }

  render() {
    return (
      <div>
        <FormGroup row>
          <Col sm={9}>
            <Input
              type="text"
              onChange={this.props.onChangeTitle}
              placeholder="Post Title"
              value={this.props.title}
            />
          </Col>
            <div className="col ml-5" sm={1}>
              <Button color="success" sm={1} onClick={this.onSubmit}>
                {this.props.isEdit ? "Edit" : "Post"}
              </Button>{" "}
              <Button color="info" sm={1}>
                Save
              </Button>{" "}
              <Button color="danger" sm={1} onClick={this.props.onDelete}>
                Delete
              </Button>
            </div>
        </FormGroup>

        <Editor
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          usageStatistics={false}
          useCommandShortcut={true}
          ref={this.editorRef}
          exts={[
            {
              name: "chart",
              minWidth: 100,
              maxWidth: 600,
              minHeight: 100,
              maxHeight: 300
            },
            "scrollSync",
            "colorSyntax",
            "uml",
            "mark",
            "table"
          ]}
        />
      </div>
    );
  }
}

export default TextEditor;
