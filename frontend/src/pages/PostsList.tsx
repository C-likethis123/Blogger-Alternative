import React, { useEffect, useContext } from "react";
import PostSummary from "../components/PostSummary";
import { useHistory } from "react-router-dom";
import { Paths } from "../utils/paths";
import BlogDropdown from "../components/BlogDropdown";
import BlogContext from "../contexts/BlogContext";
import { fetchPosts, deletePost } from "../loaders/posts";

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Sheet from "../components/Sheet";
import Typography from '@mui/joy/Typography';
import { useFetchData } from "../loaders/useFetchData";

export default function Component() {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const { isBlogsLoading, error, blogs, selectedBlog: blogId } = useContext(BlogContext);
    const history = useHistory();
    const { loading: isPostsLoading, data, error: postsError } = useFetchData(
        fetchPosts, [blogId], [blogId]
    );
    useEffect(() => {
        if (!isPostsLoading && data) {
            setPosts(data);
        }
    }, [isPostsLoading, data]);

    const handleDelete = (id: Post['id']) => {
        deletePost(blogId, id)
            .then(() => setPosts(posts.filter((post) => post.id !== id)))
    };

    const createPost = () => history.push(Paths.CreatePost);
    return <Sheet sx={{
        height: '100vh',
        overflow: 'auto'
    }} isLoading={isBlogsLoading || isPostsLoading} error={error}>
        {blogs.length === 0 ?
            <Box sx={{
                textAlign: "center",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}>
                <Typography level="h2">You have no blogs</Typography>
                <Typography>Create one in Google Blogger to share your thoughts and experiences with the world!</Typography>
            </Box>
            :
            <Box sx={{ display: 'flex', width: '100%' }}>
                <BlogDropdown />
                <Sheet isLoading={isPostsLoading} error={postsError} sx={{ width: '100%', mx: 20 }}>
                    {
                        posts.length === 0 ?
                            <Box sx={{
                                textAlign: "center",
                                padding: "20px",
                                borderRadius: "8px",
                            }}>
                                <Typography>You have no posts in this blog. Create one now!</Typography>
                                <Button onClick={createPost}>Create Post</Button>
                            </Box>
                            :
                            <>
                                <Box display="flex" justifyContent={"space-between"} sx={{ py: 2 }}>
                                    <Typography level="h2">Your Posts</Typography>
                                    <Button onClick={createPost}>Create Post</Button>
                                </Box>
                                {
                                    posts.map((post) => <PostSummary
                                        post={post}
                                        key={post.id}
                                        deletePost={handleDelete}
                                    />)
                                }
                            </>
                    }
                </Sheet>
            </Box>
        }
    </Sheet>
}