import React from "react";
import "./styles.css";

let id = 0;
function Todo(props) {
  return (
    <div id={props.todo.id}>
      <input
        type="checkbox"
        checked={props.todo.checked}
        onChange={props.onToggle}
      />
      <button onClick={props.onDelete}>Delete</button>
      <span>{props.todo.text}</span>
    </div>
  );
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }
  newTodo() {
    const text = prompt("Please enter the new Todo name!!");
    this.setState({
      todos: [...this.state.todos, { text: text, id: id++, checked: false }]
    });
  }

  remove(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  onToggle(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        todo.checked = !todo.checked;
        return todo;
      })
    });
  }
  render() {
    return (
      <div className="App">
        <h6>Total Todo Count: {this.state.todos.length}</h6>
        <h6>
          Unchecked Todo Count:{" "}
          {this.state.todos.filter(todo => !todo.checked).length}
        </h6>
        <button onClick={() => this.newTodo()}>Add new Todo</button>
        <ul>
          {this.state.todos.map(todo => {
            return (
              <Todo
                onToggle={() => this.onToggle(todo.id)}
                onDelete={() => this.remove(todo.id)}
                todo={todo}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
