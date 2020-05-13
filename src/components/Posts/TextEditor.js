import React, { Component } from "react";

import "codemirror/lib/codemirror.css";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

import CustomEditor from "./CustomEditor";
import { Button, Input, FormGroup, Col } from "reactstrap";

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      timerID: null,
      prevContent: null,
    };
  }

  onAutoSave = () => {
    const currContent = this.editorRef.current.getInstance().getValue();
    if (this.state.prevContent !== currContent) {
      this.onSave();
    }
  }

  componentDidMount() {
    this.setState({
      timerID: setInterval(this.onAutoSave, 6000),
    });
  }

  /* 
    needed as the props updates after the first render because of EditToDo's asynchronous data 
    fetching operation during its
    componentDidMount method. The second render provided the actual content of the blog post. 
  */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content !== this.props.content) {
      const content = this.props.content;
      this.editorRef.current.getInstance().setMarkdown(content);
      this.setState({ prevContent: content });
    }
  }

  onSubmit = () => {
    const content = this.editorRef.current.getInstance().getValue();
    this.props.onSubmit(content);
  }

  onSave = () => {
    const content = this.editorRef.current.getInstance().getValue();
    this.props.onSave(content);
    this.setState({ prevContent: content });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
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
            <Button color="info" sm={1} onClick={this.onSave}>
              Save
            </Button>{" "}
            <Button color="danger" sm={1} onClick={this.props.onDelete}>
              Delete
            </Button>
          </div>
        </FormGroup>

        <CustomEditor
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          usageStatistics={false}
          useCommandShortcut={true}
          ref={this.editorRef}
        />
      </div>
    );
  }
}

export default TextEditor;
