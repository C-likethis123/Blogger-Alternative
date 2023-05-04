import express, {Request, Response} from 'express';
import Controller from './controller';

class PostsController implements Controller {
   public router = express.Router();

   constructor() {
      this.router.get('/api/posts/', (req: Request, res: Response) => {
         res.send('Getting a post');
      });
   }
}
export default PostsController;

