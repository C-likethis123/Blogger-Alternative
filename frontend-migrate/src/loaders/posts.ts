import React from "react";
import queryClient from './queryClient';

// TODO: API for this

export const createPost = async (post: Post) => {
    const { data } = await queryClient.post("/api/post", post);
    return data;
}

export const fetchPost = async (id: string) => {
    const { data } = await queryClient.get(`/api/post/${id}`);
    return data;
}