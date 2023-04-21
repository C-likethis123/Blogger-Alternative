import React from 'react';
import { useNavigate } from "react-router-dom";

interface PostSummaryProps {
    post: Post;
    deletePost: (id: Post['_id']) => void;
}
export default function PostSummary(props: PostSummaryProps) {
    const navigate = useNavigate();
    const goToEdit = () => navigate(`edit/${props.post._id}`);
    const deletePost = () => {
        if (window.confirm(`Are you sure you want to delete '${props.post.title || '(Untitled)'}'?`)) {
            props.deletePost(props.post._id);
        }
    };

    const goToView = () => navigate(`post/${props.post._id}`);
    return (
        <div>
            <h5>
                {props.post.title || '(Untitled)'}
            </h5>
            <div>
                {props.post.isDraft ? 'Draft' : 'Published'}
            </div>
            <div>
                <button color="primary" onClick={goToEdit}>
                    Edit
                </button>
                <button color="danger" onClick={deletePost}>
                    Delete
                </button>
                <button color="info" onClick={goToView}>
                    View
                </button>
            </div>
        </div >
    );
};
