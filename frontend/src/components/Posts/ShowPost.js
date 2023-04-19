import React from "react";
import axios from "axios";
import "../../App.css";
import { Button } from "reactstrap";
import Viewer from "./Viewer";
import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";
import { useParams } from "react-router-dom";

function ShowPost(props) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const viewerRef = React.useRef();
  const { id } = useParams();
  const downloadPost = async () => {
    const content = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
    ${viewerRef.current.rootEl.current.innerHTML}
    </body>
    </html>`;
    const fileName = `${title}.docx`;
    const fileData = await asBlob(content);
    saveAs(fileData, fileName);
  };

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(({ data: { title, content } }) => {
        setTitle(title);
        setContent(content);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <React.Fragment>
      <h3>{title}</h3>
      <Viewer
        initialValue={content}
        ref={viewerRef}
      />
      <Button onClick={downloadPost}>Download as Word document</Button>
    </React.Fragment>
  );
}

export default ShowPost;
