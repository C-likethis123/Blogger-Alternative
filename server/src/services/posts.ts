import { blogger_v3, google } from 'googleapis';
import type { OAuth2Client } from 'google-auth-library';

/*
A PostService that takes in an OAuth2Client for authentication and provides an interface for the blogger API
*/

class PostService {
    private bloggerClient: blogger_v3.Resource$Posts;
    constructor(oauth2Client: OAuth2Client) {
        this.bloggerClient = google.blogger({
            version: 'v3',
            auth: oauth2Client,
        }).posts;
    }
    public async getPosts(blogId: string, pageToken: string | null): Promise<blogger_v3.Schema$PostList> {
        const posts = await this.bloggerClient.list({
            blogId,
            fetchBodies: false,
            fetchImages: false,
            pageToken,
            fields: 'items(id,blog.id,title,status),nextPageToken',
        })
        if (posts.status >= 400) {
            throw new Error(posts.statusText);
        }
        const { items, nextPageToken } = posts.data;
        return { items, nextPageToken };
    }

    public async getPost(blogId: string, postId: string): Promise<blogger_v3.Schema$Post> {
        const post = await this.bloggerClient.get({
            blogId,
            postId,
            fields: 'id,blog.id,title,content,images',
        });
        if (post.status >= 400) {
            throw new Error(post.statusText);
        }
        return post.data;
    }

    public async insertPost(blogId: string, requestBody: blogger_v3.Schema$Page): Promise<blogger_v3.Schema$Post> {
        const post = await this.bloggerClient.insert({
            blogId,
            requestBody
        });
        if (post.status >= 400) {
            throw new Error(post.statusText);
        }
        return post.data;
    }

    public async updatePost(blogId: string, postId: string, requestBody: blogger_v3.Schema$Page): Promise<blogger_v3.Schema$Post> {
        const post = await this.bloggerClient.patch({
            blogId,
            postId,
            requestBody
        });
        if (post.status >= 400) {
            throw new Error(post.statusText);
        }
        return post.data;
    }

    public async deletePost(blogId: string, postId: string): Promise<void> {
        const res = await this.bloggerClient.delete({
            blogId,
            postId
        });
        if (res.status >= 400) {
            throw new Error(res.statusText);
        }
        return;
    }
}
export default PostService;

