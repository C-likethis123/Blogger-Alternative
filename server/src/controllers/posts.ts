import express, {Request, Response} from 'express';
import Controller from './controller';

class PostsController implements Controller {
   public path = '/posts';
   public router = express.Router();

   constructor() {
      this.router.get('/', (req: Request, res: Response) => {
         res.send('Getting a post');
      });
   }
}
export default PostsController;

