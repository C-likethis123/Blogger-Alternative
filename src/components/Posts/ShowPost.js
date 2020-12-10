import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import { Button } from "reactstrap";
import ViewerComponent from "./Viewer";
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";

class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
    this.viewerRef = React.createRef();
  }

  downloadPost = async () => {
    const header = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>`;
    const footer = `</body>
    </html>`;
    const content =
      header + this.viewerRef.current.rootEl.current.innerHTML + footer;
    const title = `${this.state.title}.docx`;
    const fileData = await asBlob(content);
    saveAs(fileData, title);
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/posts/${this.props.match.params.id}`)
      .then((response) => this.setState({ ...response.data }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="view-post">{this.state.title}</h3>
        <ViewerComponent
          initialValue={this.state.content}
          ref={this.viewerRef}
        />

        <Button onClick={this.downloadPost}>Download as Word document</Button>
      </React.Fragment>
    );
  }
}

export default ShowPost;
