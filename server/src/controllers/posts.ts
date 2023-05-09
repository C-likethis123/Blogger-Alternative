import express, { Request, Response } from 'express';
import Controller from './controller';
import checkAuthenticated from 'middleware/authenticator';
import { google } from 'googleapis';
import type { Credentials } from 'google-auth-library';
import PostService from 'services/posts';

type User = {
   id: string;
   tokens: Credentials
}

/*
What do I need to test here?
- test that I can retrieve the blogs
- need to stub blogger API client
*/
class PostsController implements Controller {
   public router = express.Router();

   constructor() {
      // this.router.get('/api/posts', checkAuthenticated, (req: Request, res: Response) => {
      //    const posts = PostService.getPosts();
      //    res.json(posts);
      // });
      // this.router.get('/api/blogs', checkAuthenticated, async (req: Request, res: Response) => {
      //    // from user ID, retrieve access token directly
      //    const { tokens } = req.user as User;

      //    // initialise a GoogleOAuth client
      //    const oauth2Client = new google.auth.OAuth2(
      //       process.env.GOOGLE_OAUTH_CLIENT_ID,
      //       process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      //       "http://localhost:8000/oauth/redirect/google",
      //    );
      //    oauth2Client.setCredentials(tokens);

      //    const blogger = google.blogger({
      //       version: "v3",
      //       auth: oauth2Client
      //    })

      //    // make this request
      //    const blogs = await blogger.blogs.listByUser({
      //       userId: "self",
      //       fields: "items(id,status,name)",
      //    });
      //    if (blogs.status === 200) {
      //       const listOfBlogs = blogs.data.items;
      //       console.log(listOfBlogs);
      //       return res.status(200).json(listOfBlogs);
      //    }
      //    //TODO: proper error handling
      //    return res.status(400).json(blogs);
      // });
   }
}
export default PostsController;

