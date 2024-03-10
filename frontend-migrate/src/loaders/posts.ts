import React from "react";
import queryClient from './queryClient';

// TODO: API for this

export const createPost = async (post: Post) => {
    const { data } = await queryClient.post("/api/post", post);
    return data;
}

export const fetchPost = async (blogId: string, id: string) => {
    const { data } = await queryClient.get(`/api/blogs/${blogId}/posts/${id}`);
    console.log(data);
    return data;
}