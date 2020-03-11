import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";
import {Container} from "reactstrap";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import PostsList from "./components/PostsList";
import ShowPost from "./components/ShowPost";

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={PostsList} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/create" component={CreatePost} />
            <Route path="/:id" component={ShowPost} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
