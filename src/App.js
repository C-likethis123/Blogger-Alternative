import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";
import { Container } from "reactstrap";
import Paths from './constants/paths';

const CreatePost = lazy(() => import("./components/Posts/CreatePost.js"));
const EditPost = lazy(() => import("./components/Posts/EditPost.js"));
const PostsList = lazy(() => import("./components/Posts/PostsList.js"));
const ShowPost = lazy(() => import("./components/Posts/ShowPost.js"));
const HomePage = lazy(() => import("./components/HomePage/HomePage.js"));
class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path={Paths.PostsList} component={PostsList} />
              <Route path={Paths.CreatePost} component={CreatePost} />
              <Route path={`${Paths.EditPost}/:id`} component={EditPost} />
              <Route path={`${Paths.Post}/:id`} component={ShowPost} />
              <Route path={Paths.Default} component={HomePage} />
            </Switch>
          </Suspense>
        </Router>
      </Container>
    );
  }
}

export default App;
