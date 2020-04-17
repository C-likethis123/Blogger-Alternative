import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";
import {Container} from "reactstrap";
import CreatePost from "./components/Posts/CreatePost";
import EditPost from "./components/Posts/EditPost";
import PostsList from "./components/Posts/PostsList";
import ShowPost from "./components/Posts/ShowPost";

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
