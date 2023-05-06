import express, {Request, Response} from 'express';
import Controller from './controller';
import checkAuthenticated from '../middleware/authenticator';
import {google } from 'googleapis';

const blogger = google.blogger('v3');

type User = {
   id: string;
   token: string;
}
class PostsController implements Controller {
   public router = express.Router();

   private posts = [{
      title: 'Test',
      content: 'Test', 
      _id: '1',
   }]
   constructor() {
      this.router.get('/api/posts', checkAuthenticated, (req: Request, res: Response) => {
         res.json(this.posts);
      });
      this.router.get('/api/blogs', checkAuthenticated, async (req: Request, res: Response) => {
         const {id, token} = req.user as User;
         // from user ID, retrieve access token directly

         // initialise a GoogleOAuth client

         // make this request
         const blogs = await blogger.blogs.listByUser({
            userId: id,
         });
      });
   }
}
export default PostsController;

