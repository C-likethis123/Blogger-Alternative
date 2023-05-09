import express, { Request, Response } from 'express';
import Controller from './controller';
import checkAuthenticated from 'middleware/authenticator';
import BlogService from 'services/blogs';

/*
What do I need to test here?
- test that I can retrieve the blogs
- need to stub blogger API client
*/
class BlogsController implements Controller {
    public router = express.Router();

    constructor() {
        this.router.get('/api/blogs', checkAuthenticated, async (req: Request, res: Response) => {
            // from user ID, retrieve user credentials
            const { oauth2Client } = req;

            // make this request
            try {
                const service = new BlogService(oauth2Client);
                const blogs = await service.getBlogs();
                return res.status(200).json(blogs);
            } catch (err) {
                //TODO: proper error handling
                return res.status(400).json({err: err.message});
            }
        });
    }
}
export default BlogsController;

