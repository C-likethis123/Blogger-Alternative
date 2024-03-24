import React, { useContext } from "react";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import Editor from "../components/Editor";
import { useHistory, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../loaders/posts";
import { Paths } from "../utils/paths";
import BlogContext from "../contexts/BlogContext";
type RouteParams = {
    id: string;
}

export default function Component() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [isDraft, setIsDraft] = React.useState(true);
    const history = useHistory();
    const { id } = useParams<RouteParams>();
    const { selectedBlog: blogId } = useContext(BlogContext);

    React.useEffect(() => {
        fetchPost(blogId, id)
            .then(({ title, content }) => {
                setTitle(title);
                setContent(content);
            })
            .catch((error) => console.log(error));
    }, [blogId, id]);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onSubmit = () => {
        const newPost = {
            title,
            content,
        };

        updatePost(blogId, id, newPost).then(() => history.push(Paths.PostsList));
    }
    const onSave = (content: string) => {
        const newPost = {
            title,
            content,
        };
        updatePost(blogId, id, newPost)
            .catch((err) => {
                console.log(err);
            });
    }

    return <Sheet sx={{
        mx: 20,
        px: 20,
        py: 2,
        height: '100vh',
        overflow: 'auto',
        borderLeft: '1px solid',
        borderRight: '1px solid',
        borderColor: 'divider'
    }}>
        <Box display="flex" justifyContent={"space-between"} sx={{ my: 2 }}>
            <Typography level="h3">Edit Post</Typography>
            <Button onClick={onSubmit}>Publish</Button>
        </Box>
        <Editor
            title={title}
            content={content}
            isEdit
            onSubmit={onSubmit}
            onChangeTitle={onChangeTitle}
            onChangeContent={onChangeContent}
            onSave={onSave}
        />
    </Sheet>
}