import React, { useContext, useEffect } from "react";
import "../styles/App.css";
import Viewer from "../components/Viewer";
import { useParams } from "react-router-dom";
import BlogContext from "../contexts/BlogContext";
import { fetchPost } from "../loaders/posts";

import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';

export default function Component() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const { id } = useParams<{ id: string }>();
    const { selectedBlog: blogId } = useContext(BlogContext);
    const downloadPost = async () => { };

    useEffect(() => {
        fetchPost(blogId, id)
            .then(({ title, content }) => {
                setTitle(title);
                setContent(content);
            })
            .catch((error) => console.log(error));
    }, [id]);
    return <Sheet
        sx={{
            mx: 20,
            px: 20,
            py: 2,
            height: '100vh',
            overflow: 'auto',
            borderLeft: '1px solid',
            borderRight: '1px solid',
            borderColor: 'divider'
        }}>
        <Typography level="h3">{title}</Typography>
        <Viewer value={content || '(No content)'} />
        <Divider sx={{my: 2}} />
        <Button onClick={downloadPost} sx={{float: 'right'}}>Download as Word Document</Button>
    </Sheet>
}
