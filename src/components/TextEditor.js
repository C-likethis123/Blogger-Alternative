import React, { Component } from "react";

import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.min.css";
import "tui-editor/dist/tui-editor-contents.min.css";
import { Editor } from "@toast-ui/react-editor";

import { Button, Input, FormGroup, Col } from "reactstrap";

class TextEditor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FormGroup row>
          <Col sm={9}>
            <Input
              type="text"
              placeholder="Post Title"
              value={this.props.title}
              onChange={this.props.onChangeTitle}
            />
          </Col>
            <div className="col ml-5" sm={1}>
              <Button color="success" sm={1}>
                {this.props.isEdit ? "Edit" : "Post"}
              </Button>{" "}
              <Button color="info" sm={1}>
                Save
              </Button>{" "}
              <Button color="danger" sm={1}>
                Delete
              </Button>
            </div>
        </FormGroup>

        <Editor
          initialValue={this.props.post}
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
