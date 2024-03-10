import React, { useEffect, useContext } from "react";
import PostSummary from "../components/PostSummary";
import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogDropdown from "../components/BlogDropdown";
import BlogContext from "../contexts/BlogContext";
import axios from "axios";

export default function Component() {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const {selectedBlog : blogId} = useContext(BlogContext);
    const history = useHistory();
    useEffect(() => {
        if (blogId) {
            fetch(`/api/blogs/${blogId}/posts`)
            .then(response => response.json())
            .then((response) => setPosts(response))
            .catch((error) => console.log(error));
        }
    },[blogId]);
    const deletePost = (id: Post['id']) => {
        axios.delete(`/api/blogs/${blogId}/posts/${id}`)
             .then(() => setPosts(posts.filter((post) => post.id !== id)))
    };

    const createPost = () => history.push(Paths.CreatePost);
    return <div>
        <h3>Your Posts</h3>
        <BlogDropdown />
        <button onClick={createPost}>Create Post</button>
        {
            posts.map((post) => <PostSummary
                post={post}
                key={post.id}
                deletePost={deletePost}
            />)
        }
    </div>
}