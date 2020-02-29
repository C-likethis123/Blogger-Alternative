import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

import CreateToDo from "./components/CreateToDo";
import EditToDo from "./components/EditToDo";
import ToDosList from "./components/ToDosList";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar">
          <img src={logo} alt="Test app" />
        </nav>
        <Link to="/">MERN-Stack ToDo List</Link>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              ToDos
            </Link>
          </li>
          <li>
            <Link to="/create" className="nav-link">
              Create
            </Link>
          </li>
          <li></li>
        </ul>
        <Route path="/" exact component={ToDosList} />
        <Route path="/edit/:id" component={EditToDo} />
        <Route path="/create" component={CreateToDo} />
      </Router>
    );
  }
}

export default App;
