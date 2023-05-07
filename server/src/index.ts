import App from './app';
import AuthenticationController from 'controllers/authentication';
import PostsController from "controllers/posts";

const app = new App([
  new AuthenticationController(),
  new PostsController()
], 8000);
app.listen();
