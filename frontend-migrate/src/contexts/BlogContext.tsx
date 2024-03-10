import { createContext, useState, useEffect } from "react";
import axios from "axios";

type BlogValue = {
    blogs: Blog[],
    selectedBlog: Blog['id'],
    handleBlogChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
const BlogContext = createContext<BlogValue>({} as BlogValue);

function useBlogContextProps(): BlogValue {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog['id']>('');
    const handleBlogChange = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedBlog(event.target.value);
    
    useEffect(() => {
        fetchBlogs().then(res => {
            setBlogs(res);
            setSelectedBlog(res[0]?.id);
    });
    }, [])
    return {
        blogs,
        selectedBlog,
        handleBlogChange
    }
}

export const BlogProvider = ({ children}: {
    children: React.ReactNode;
    value?: BlogValue;
}) => {
    const values = useBlogContextProps();
    return (<BlogContext.Provider value={values}>
        {children}
    </BlogContext.Provider>)
}

export default BlogContext;