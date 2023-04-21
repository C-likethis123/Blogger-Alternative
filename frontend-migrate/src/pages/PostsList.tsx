import React, { useEffect } from "react";
import PostSummary from "../components/PostSummary";
import { useNavigate } from "react-router-dom";

export function Component() {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/posts/")
            .then(response => response.json())
            .then((response) => setPosts(response))
            .catch((error) => console.log(error));
    }, []);
    const deletePost = (id: Post['_id']) => {
        fetch(`/posts/${id}`, {
            method: 'DELETE'
        })
            .then(() => setPosts(posts.filter((post) => post._id !== id)))
    };

    const createPost = () => navigate('/posts');
    return <div>
        <h3>Your Posts</h3>
        <button onClick={createPost}>Create Post</button>
        {
            posts.map((post) => <PostSummary
                post={post}
                key={post._id}
                deletePost={deletePost}
            />)
        }
    </div>
}