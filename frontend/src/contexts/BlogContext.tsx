import { createContext, useState, useEffect } from "react";
import { fetchBlogs } from "../loaders/blogs";
import { useFetchData } from "../loaders/useFetchData";

type BlogValue = {
    blogs: Blog[],
    selectedBlog?: Blog['id'] | null,
    handleBlogChange: (selectedBlog: Blog['id']) => void,
    isBlogsLoading: boolean;
    error: Error | null;
}
const BlogContext = createContext<BlogValue>({} as BlogValue);

function useBlogContextProps(): BlogValue {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog['id'] | null>(null);
    const handleBlogChange = (selectedBlog: Blog['id']) => setSelectedBlog(selectedBlog);

    const updateData = (data: Blog[]) => {
        setBlogs(data);
        setSelectedBlog(data[0]?.id);
    }
    const { loading, error } = useFetchData(
        fetchBlogs, [], [], updateData
    );

    return {
        blogs,
        selectedBlog,
        handleBlogChange,
        isBlogsLoading: loading,
        error,
    }
}

export const BlogProvider = ({ children }: {
    children: React.ReactNode;
    value?: BlogValue;
}) => {
    const values = useBlogContextProps();
    return (<BlogContext.Provider value={values}>
        {children}
    </BlogContext.Provider>)
}

export default BlogContext;