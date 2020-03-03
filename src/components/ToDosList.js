import React, { Component } from "react";
import { Link } from "react-router-dom";

import {Table} from "reactstrap";

import axios from "axios";

const Todo = props => (
  <tr>
    <td className={props.todo.isCompleted ? 'completed' : ''}>{props.todo.description}</td>
    <td className={props.todo.isCompleted ? 'completed' : ''}>{props.todo.responsible}</td>
    <td className={props.todo.isCompleted ? 'completed' : ''}>{props.todo.priority}</td>
    <td>
      <Link to={`/edit/${props.todo._id}`}>Edit</Link>
    </td>
  </tr>
)

class ToDosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let todos = this.state.todos.map((currentToDo, i) => {
      return <Todo todo={currentToDo} key={i} />;
    });

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{todos}</tbody>
        </Table>
      </div>
    );
  }
}

export default ToDosList;
