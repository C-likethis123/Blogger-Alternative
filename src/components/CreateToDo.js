import React, { Component } from "react";

class CreateToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      responsible: "",
      priority: "",
      isCompleted: false
    };

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // can refactor to more generic method
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeResponsible(e) {
    this.setState({
      responsible: e.target.value
    });
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.description}`);
    console.log(`Todo Responsible: ${this.state.responsible}`);
    console.log(`Todo Priority: ${this.state.priority}`);

    this.setState({
      description: "",
      responsible: "",
      priority: "",
      isCompleted: false
    });
  }
  render() {
    return (
      <div>
        <h3>Create New ToDo</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Description: </label>
            <input
              type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div>
            <label>Responsible: </label>
            <input
              type="text"
              value={this.state.responsible}
              onChange={this.onChangePriority}
            />
          </div>

          <div>
            <div>
              <input
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.priority === "Low"}
                onChange={this.onChangePriority}
              />
              <label>Low</label>
            </div>

            <div>
              <input
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.priority === "Medium"}
                onChange={this.onChangePriority}
              />
              <label>Medium</label>
            </div>

            <div>
              <input
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.priority === "High"}
                onChange={this.onChangePriority}
              />
              <label>High</label>
            </div>
          </div>

          <div>
            <input type="submit" value="Create ToDo" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateToDo;
