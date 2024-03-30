import express, { Request, Response } from 'express';
import Controller from './controller';
import checkAuthenticated from 'middleware/authenticator';
import PostsService from 'services/posts';

interface PostListQueryParams {
   pageToken?: string;
}

class PostsController implements Controller {
   public router = express.Router();

   constructor() {
      // TODO: check HTTP naming conventions. Why do we have /posts?
      this.router.get('/api/blogs/:blogId/posts', checkAuthenticated, async (req: Request<any, any, any, PostListQueryParams>, res: Response) => {
         const { oauth2Client } = req;
         const { blogId } = req.params;
         const pageToken = req.query.pageToken;
         try {
             const service = new PostsService(oauth2Client);
             const blogs = await service.getPosts(blogId, pageToken);
             return res.status(200).json(blogs);
         } catch (err) {
            return res.status(400).json({err: err.message});
         }
     });

     this.router.get('/api/blogs/:blogId/posts/:postId', checkAuthenticated, async (req: Request, res: Response) => {
      const { oauth2Client } = req;
      const { blogId, postId } = req.params;
      try {
         const service = new PostsService(oauth2Client);
         const post = await service.getPost(blogId, postId);
         return res.status(200).json(post);
      } catch (err) {
         return res.status(400).json({err: err.message});
      }
     })

     this.router.post('/api/blogs/:blogId/posts', checkAuthenticated, async (req: Request, res: Response) => {
      const { oauth2Client } = req;
      const { blogId } = req.params;
      const reqBody = {
         title: req.body.title,
         content: req.body.content,
      }
      try {
         const service = new PostsService(oauth2Client);
         const post = await service.insertPost(blogId, reqBody);
         return res.status(200).json(post);
      } catch (err) {
         return res.status(400).json({err: err.message});
      }
     })

     this.router.patch('/api/blogs/:blogId/posts/:postId', checkAuthenticated, async (req: Request, res: Response) => {
      const { oauth2Client } = req;
      const { blogId, postId } = req.params;
      try {
         const service = new PostsService(oauth2Client);
         const {title, content} = req.body;
         await service.updatePost(blogId, postId, {title, content});
         return res.status(204).json(null);
      } catch (err) {
         return res.status(400).json({err: err.message});
      }
     });

     this.router.delete('/api/blogs/:blogId/posts/:postId', checkAuthenticated, async (req: Request, res: Response) => {
      const { oauth2Client } = req;
      const { blogId, postId } = req.params;
      try {
         const service = new PostsService(oauth2Client);
         await service.deletePost(blogId, postId);
         return res.status(204).json(null);
      } catch (err) {
         return res.status(400).json({err: err.message});
      }
     })
   }
}
export default PostsController;

