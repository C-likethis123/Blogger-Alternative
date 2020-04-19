import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";
import {Container} from "reactstrap";
const CreatePost = lazy(() => import("./components/Posts/CreatePost.js"));
const EditPost = lazy(() => import("./components/Posts/EditPost.js"));
const PostsList = lazy(() => import("./components/Posts/PostsList.js"));
const ShowPost = lazy(() => import("./components/Posts/ShowPost.js"));

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Header />
          <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/" component={PostsList} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/create" component={CreatePost} />
            <Route path="/:id" component={ShowPost} />
            </Suspense>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
