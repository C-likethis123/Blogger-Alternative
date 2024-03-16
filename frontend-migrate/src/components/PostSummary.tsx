import React from 'react';
import { useHistory } from "react-router-dom";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
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
            <Box>
                <Button color="primary" onClick={goToEdit}>
                    Edit
                </Button>
                <Button color="danger" onClick={deletePost}>
                    Delete
                </Button>
                <Button color="neutral" onClick={goToView}>
                    View
                </Button>
            </Box>
        </Box>
    );
};
