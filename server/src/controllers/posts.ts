import express, {Request, Response} from 'express';
import Controller from './controller';
import checkAuthenticated from '../middleware/authenticator';

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
   }
}
export default PostsController;

