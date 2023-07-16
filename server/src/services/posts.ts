import { blogger_v3, google } from 'googleapis';
import type { OAuth2Client } from 'google-auth-library';

/*
A PostService that takes in an OAuth2Client for authentication and provides an interface for the blogger API
// TODO: refactor to actually accomodate posts
*/

class PostService {
    private bloggerClient: blogger_v3.Resource$Posts;
    constructor(oauth2Client: OAuth2Client) {
        this.bloggerClient = google.blogger({
            version: 'v3',
            auth: oauth2Client,
        }).posts;
    }
    // TODO: Support pagination
    public async getPosts(blogId: string): Promise<blogger_v3.Schema$Post[]> {
        const posts = await this.bloggerClient.list({
            blogId,
            fetchBodies: false,
            fetchImages: false,
            fields: 'items(id,blog.id,title,status)',
        })
        if (posts.status >= 400) {
            throw new Error();
        }

        return posts.data.items || [];
    }

    public async getPost(blogId: string, postId: string): Promise<blogger_v3.Schema$Post> {
        const post = await this.bloggerClient.get({
            blogId,
            postId,
            fields: 'id,blog.id,title,content,images',
        });
        if (post.status >= 400) {
            throw new Error();
        }
        return post.data;
    }
}
export default PostService;

