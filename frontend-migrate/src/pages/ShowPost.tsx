import React from "react";
import axios from "axios";
import "../styles/App.css";
import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";

export function Component() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const { id } = useParams<{ id: string }>();
    const downloadPost = async () => {};

    React.useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(({ data: { title, content }}) => {
                setTitle(title);
                setContent(content);
            })
            .catch((error) => console.log(error));
    }, [id]);
    return <div>
        <h3>{title}</h3>
        <Viewer value={content} />
        <button onClick={downloadPost}>Download as Word Document</button>
    </div>
}
