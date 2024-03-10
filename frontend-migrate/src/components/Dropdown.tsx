import React, { useContext } from "react";
import BlogContext from "../contexts/BlogContext";
/**
 * A UI component that shows important links to the user
 */

export default function Dropdown() {
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