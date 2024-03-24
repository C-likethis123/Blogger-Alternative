import React, { useContext } from "react";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Sheet from "../components/Sheet";

import Editor from "../components/Editor";
import { useHistory, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../loaders/posts";
import { Paths } from "../utils/paths";
import BlogContext from "../contexts/BlogContext";
import { useFetchData } from "../loaders/useFetchData";
type RouteParams = {
    id: string;
}

export default function Component() {
    const [titleState, setTitle] = React.useState("");
    const [contentState, setContent] = React.useState("");
    const [isDraft, setIsDraft] = React.useState(true);
    const [buttonLoading, setButtonLoading] = React.useState(false);
    const history = useHistory();
    const { id } = useParams<RouteParams>();
    const { selectedBlog: blogId } = useContext(BlogContext);

    const { loading, data, error } = useFetchData(
        fetchPost, [blogId, id], [blogId, id]
    );
    React.useEffect(() => {
        if (!loading && data) {
            setTitle(data.title);
            setContent(data.content);
        }
    }, [loading, data]);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onSubmit = () => {
        const newPost = {
            title: titleState,
            content: contentState,
        };
        setButtonLoading(true);
        updatePost(blogId, id, newPost).then(() => history.push(Paths.PostsList));
    }
    const onSave = (content: string) => {
        const newPost = {
            titleState,
            content,
        };
        setButtonLoading(true);
        updatePost(blogId, id, newPost)
            .catch((err) => {
                console.log(err);
            });
    }

    return <Sheet isLoading={loading} error={error} sx={{
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
            <Button loading={buttonLoading} onClick={onSubmit}>Publish</Button>
        </Box>
        <Editor
            title={titleState}
            content={contentState}
            isEdit
            onSubmit={onSubmit}
            onChangeTitle={onChangeTitle}
            onChangeContent={onChangeContent}
            onSave={onSave}
        />
    </Sheet>
}