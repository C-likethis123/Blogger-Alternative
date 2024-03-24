import { createContext, useState, useEffect } from "react";
import { fetchBlogs } from "../loaders/blogs";
import { useFetchData } from "../loaders/useFetchData";

type BlogValue = {
    blogs: Blog[],
    selectedBlog: Blog['id'],
    handleBlogChange: (selectedBlog: Blog['id']) => void,
    isBlogsLoading: boolean;
    error: Error | null;
}
const BlogContext = createContext<BlogValue>({} as BlogValue);

function useBlogContextProps(): BlogValue {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [selectedBlog, setSelectedBlog] = useState<Blog['id']>('');
    const handleBlogChange = (selectedBlog: Blog['id']) => setSelectedBlog(selectedBlog);

    const { loading, data, error } = useFetchData(
        fetchBlogs, [], []
    );
    useEffect(() => {
        if (!loading && data) {
            setBlogs(data);
            setSelectedBlog(data[0]?.id);
        }
    }, [loading, data]);

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