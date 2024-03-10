import React, { useEffect } from "react";
import PostSummary from "../components/PostSummary";
import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogDropdown from "../components/BlogDropdown";

export default function Component() {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const history = useHistory();
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

    const createPost = () => history.push(Paths.CreatePost);
    return <div>
        <h3>Your Posts</h3>
        <BlogDropdown />
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