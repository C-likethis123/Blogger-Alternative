import express, {Request, Response} from 'express';
import Controller from './controller';

class PostsController implements Controller {
   public router = express.Router();

   constructor() {
      this.router.get('/api/posts/', (req: Request, res: Response) => {
         res.send('Getting a post');
      });
      this.router.get('/post/1', (req, res) => {
         res.send(JSON.stringify({
            title: 'Test',
            content: 'Test',
            _id: '1'
         }))
      })
   }
}
export default PostsController;

