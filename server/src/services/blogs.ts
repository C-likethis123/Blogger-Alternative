import { blogger_v3, google } from 'googleapis';
import type { OAuth2Client } from 'google-auth-library';

/*
A BlogService that takes in an OAuth2Client for authentication and provides an interface for the blogger API
*/

class BlogService {
    private bloggerClient: blogger_v3.Resource$Blogs;
    constructor(oauth2Client: OAuth2Client) {
        this.bloggerClient = google.blogger({
            version: 'v3',
            auth: oauth2Client,
        }).blogs;
    }

    public async getBlogs(): Promise<blogger_v3.Schema$Blog[]> {
        const blogs = await this.bloggerClient.listByUser({
            userId: 'self',
            fields: 'items(id,status,name)',
        })
        if (blogs.status >= 400) {
            throw new Error(blogs.statusText);
        }

        return blogs.data.items || [];
    }
}
export default BlogService;

