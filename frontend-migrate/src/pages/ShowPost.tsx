import React, { useContext, useEffect } from "react";
import "../styles/App.css";
import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";
import BlogContext from "../contexts/BlogContext";
import { fetchPost } from "../loaders/posts";

export default function Component() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const { id } = useParams<{ id: string }>();
    const {selectedBlog: blogId} = useContext(BlogContext);
    const downloadPost = async () => {};

    useEffect(() => {
        fetchPost(blogId, id)
            .then(({ title, content }) => {
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
