import React, { useEffect, useContext } from "react";
import PostSummary from "../components/PostSummary";
import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogDropdown from "../components/BlogDropdown";
import BlogContext from "../contexts/BlogContext";
import { fetchPosts, deletePost } from "../loaders/posts";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function Component() {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const {selectedBlog : blogId} = useContext(BlogContext);
    const history = useHistory();
    useEffect(() => {
        if (blogId) {
            fetchPosts(blogId)
            .then((response) => setPosts(response))
            .catch((error) => console.log(error));
        }
    },[blogId]);
    const handleDelete = (id: Post['id']) => {
        deletePost(blogId, id)
             .then(() => setPosts(posts.filter((post) => post.id !== id)))
    };

    const createPost = () => history.push(Paths.CreatePost);
    return <Sheet>
        <Box display="flex" justifyContent={"space-between"}>
            <Typography level="h2">Your Posts</Typography>
            <Button onClick={createPost}>Create Post</Button>
        </Box>
        <BlogDropdown />
        
        {
            posts.map((post) => <PostSummary
                post={post}
                key={post.id}
                deletePost={handleDelete}
            />)
        }
    </Sheet>
}