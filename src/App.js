import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";
import { Container } from "reactstrap";
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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/create" component={CreatePost} />
              <Route exact path="/edit/:id" component={EditPost} />
              <Route path="/:id" component={ShowPost} />
            </Switch>
          </Suspense>
        </Router>
        <a href="https://www.freepik.com/free-photos-vectors/mockup">
          Mockup vector created by rawpixel.com - www.freepik.com
        </a>
      </Container>
    );
  }
}

export default App;
