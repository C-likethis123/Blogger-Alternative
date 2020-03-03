import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/NavBar/Header";

import CreateToDo from "./components/CreateToDo";
import EditToDo from "./components/EditToDo";
import ToDosList from "./components/ToDosList";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={ToDosList} />
          <Route path="/edit/:id" component={EditToDo} />
          <Route path="/create" component={CreateToDo} />
        </Switch>
      </Router>
    );
  }
}

export default App;
