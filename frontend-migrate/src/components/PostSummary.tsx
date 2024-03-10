import React from 'react';
import { useHistory } from "react-router-dom";

interface PostSummaryProps {
    post: Post;
    deletePost: (id: Post['_id']) => void;
}
export default function PostSummary(props: PostSummaryProps) {
    const history = useHistory();
    const goToEdit = () => history.push(`edit/${props.post._id}`);
    const deletePost = () => {
        if (window.confirm(`Are you sure you want to delete '${props.post.title || '(Untitled)'}'?`)) {
            props.deletePost(props.post.id);
        }
    };

    const goToView = () => history.push(`post/${props.post._id}`);
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
