import React from 'react';
import { useHistory } from "react-router-dom";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

interface PostSummaryProps {
    post: Post;
    deletePost: (id: Post['id']) => void;
}
export default function PostSummary(props: PostSummaryProps) {
    const history = useHistory();
    const goToEdit = () => history.push(`edit/${props.post.id}`);
    const deletePost = () => {
        if (window.confirm(`Are you sure you want to delete '${props.post.title || '(Untitled)'}'?`)) {
            props.deletePost(props.post.id);
        }
    };

    const goToView = () => history.push(`post/${props.post.id}`);
    return (
        <Box display="flex" justifyContent={"space-between"}>
            <Box>
                <Typography level="title-lg">
                    {props.post.title || '(Untitled)'}
                </Typography>
                <Typography level="title-sm">
                    {props.post.isDraft ? 'Draft' : 'Published'}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', '& > :not(:last-child)': { marginRight: 2 } }}>
                <Button color="primary" sx={{px: 2}} onClick={goToEdit}>
                    Edit
                </Button>
                <Button color="danger" sx={{px: 2}} onClick={deletePost}>
                    Delete
                </Button>
                <Button color="neutral" sx={{px: 2}} onClick={goToView}>
                    View
                </Button>
            </Box>
        </Box>
    );
};
