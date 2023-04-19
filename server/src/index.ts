import App from './app';
import PostsController from "./controllers/posts";

const app = new App([
  new PostsController()
], 8000);
app.listen();
