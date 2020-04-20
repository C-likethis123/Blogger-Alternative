import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import { Button } from "reactstrap";
import { Viewer } from "@toast-ui/react-editor";

class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
    this.viewerRef = React.createRef();
  }

  downloadPost = () => {
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "<head><meta charset='utf-8'></head><body>";
    const footer = "</body></html>";
    const content =
      header + this.viewerRef.current.rootEl.current.innerHTML + footer;
    const title = `${this.state.title}.doc`;
    import("js-file-download").then((jsFileDownload) => {
      jsFileDownload.default(content, title, "application/vnd.ms-word");
    });
  };

  componentDidMount() {
    axios
      .get(`http://localhost:4000/posts/${this.props.match.params.id}`)
      .then((response) => this.setState({ ...response.data }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h3 className="view-post">{this.state.title}</h3>
        <Viewer initialValue={this.state.content} ref={this.viewerRef}></Viewer>

        <Button onClick={this.downloadPost}>Download as Word document</Button>
      </div>
    );
  }
}

export default ShowPost;
