import App from './app';
import AuthenticationController from 'controllers/authentication';
import PostsController from "controllers/posts";
import BlogsController from './controllers/blogs';

const app = new App([
  new AuthenticationController(),
  new PostsController(),
  new BlogsController()
], 8000);
app.listen();
