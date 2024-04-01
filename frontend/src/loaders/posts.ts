import queryClient from './queryClient';

export const createPost = async (blogId: string, post: Partial<Post>) => {
    const { data } = await queryClient.post(`/api/blogs/${blogId}/posts`, post);
    return data;
}

export const fetchPost = async (blogId: string, postId: string) => {
    const { data } = await queryClient.get(`/api/blogs/${blogId}/posts/${postId}`);
    return data;
}

export const fetchPosts = async (blogId: string, pageToken: string | null): Promise<PostListResponse> => {
    const { data } = await queryClient.get(`/api/blogs/${blogId}/posts`, {
        params: { pageToken }
    });
    return data;
}

export const updatePost = async (blogId: string, postId: string, post: Partial<Post>) => {
    return queryClient.patch(`/api/blogs/${blogId}/posts/${postId}`, post);
}

export const deletePost = async (blogId: string, id: string) => {
    return queryClient.delete(`/api/blogs/${blogId}/posts/${id}`)
}