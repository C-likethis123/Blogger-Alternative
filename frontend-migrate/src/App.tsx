import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";

const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const PostsList = lazy(() => import("./pages/PostsList"));
const ShowPost = lazy(() => import("./pages/ShowPost"));
const HomePage = lazy(() => import("./pages/HomePage"));

const Paths = {
  CreatePost: '/create',
  PostsList: '/posts',
  EditPost: '/edit',
  Post: '/post',
  Default: '*'
}

const Loading = () => <div>Loading...</div>

export default function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={Paths.PostsList} component={PostsList} />
            <Route path={Paths.CreatePost} component={CreatePost} />
            <Route path={`${Paths.EditPost}/:id`} component={EditPost} />
            <Route path={`${Paths.Post}/:id`} component={ShowPost} />
            <Route path={Paths.Default} component={HomePage} />
          </Switch>
      </Suspense>
    </Router>
  );
};
