import express, { Request, Response } from 'express';
import Controller from './controller';
import checkAuthenticated from 'middleware/authenticator';

class PostsController implements Controller {
   public router = express.Router();

   constructor() {
      this.router.get('/api/posts', checkAuthenticated, (req: Request, res: Response) => {
         return res.json([]);
      });
   }
}
export default PostsController;

