import queryClient from './queryClient';

export const fetchBlogs = async (): Promise<Blog[]> => {
    const { data } = await queryClient.get(`/api/blogs`);
    return data;
}
