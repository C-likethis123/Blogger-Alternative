import React, { useContext } from "react";
import BlogContext from "../contexts/BlogContext";
/**
 * A dropdown component for users to select the blog they want to post in
 */

export default function BlogDropdown() {
    const {blogs, selectedBlog, handleBlogChange} = useContext(BlogContext);
    return (
        <>
            <label htmlFor="blogs">Blog: </label>
            <select name="blogs" value={selectedBlog} onChange={handleBlogChange}>
                {blogs.map(({ name, id }) => <option value={id} key={id}>{name}</option>)}
            </select>
        </>
    )
}