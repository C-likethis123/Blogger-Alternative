import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";
import {Container} from "reactstrap";
<<<<<<< HEAD
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import PostsList from "./components/PostsList";
import ShowPost from "./components/ShowPost";
import SignIn from "./components/SignIn";
=======
import CreatePost from "./components/Posts/CreatePost";
import EditPost from "./components/Posts/EditPost";
import PostsList from "./components/Posts/PostsList";
import ShowPost from "./components/Posts/ShowPost";
>>>>>>> 58e07fce8a7a1dc97f8ff83bce5ed343821b9afe

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Header />
          <Switch>
            {/* <Route exact path="/" component={SignIn} /> */}
            <Route path="/blog" component={PostsList} />
            <Route path="/blog/edit/:id" component={EditPost} />
            <Route path="/blog/create" component={CreatePost} />
            <Route path="/blog/:id" component={ShowPost} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
