import React, { useContext } from "react";
import BlogContext from "../contexts/BlogContext";

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ListSubheader from '@mui/joy/ListSubheader';

/**
 * A dropdown component for users to select the blog they want to post in
 */

export default function BlogDropdown() {
    const { blogs, selectedBlog, handleBlogChange } = useContext(BlogContext);
    return (
        <Box sx={{
            width: '220px',
            height: '100vh',
            zIndex: 10000,
            top: 0,
            left: 0,
            borderRight: '1px solid',
            borderColor: 'divider'
        }}>
            <List component="nav">
                <ListSubheader>Blogs</ListSubheader>
                {blogs.map(({ name, id }) => <ListItemButton selected={id === selectedBlog} key={id} onClick={() => handleBlogChange(id)}>{name}</ListItemButton>)}
            </List>
        </Box>
    );
}