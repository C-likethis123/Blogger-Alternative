import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";
import { Container } from "reactstrap";
import Paths from './constants/paths';
import Loading from "./components/Utils/Loading";
const CreatePost = lazy(() => import("./components/Posts/CreatePost.js"));
const EditPost = lazy(() => import("./components/Posts/EditPost.js"));
const PostsList = lazy(() => import("./components/Posts/PostsList.js"));
const ShowPost = lazy(() => import("./components/Posts/ShowPost.js"));
const HomePage = lazy(() => import("./components/HomePage/HomePage.js"));
export default function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Container fluid="xl">
          <Switch>
            <Route path={Paths.PostsList} component={PostsList} />
            <Route path={Paths.CreatePost} component={CreatePost} />
            <Route path={`${Paths.EditPost}/:id`} component={EditPost} />
            <Route path={`${Paths.Post}/:id`} component={ShowPost} />
            <Route path={Paths.Default} component={HomePage} />
          </Switch>
        </Container>
      </Suspense>
    </Router>
  );
};
