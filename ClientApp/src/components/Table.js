import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodo, toggleTodo } from "../actions/actionCreator";
import { bindActionCreators } from "redux";

class Table extends Component {
  render() {
    return (
      <div className="col-lg-10 offset-lg-1 col-md-10 col-sm-12 col-xs-12">
        
        {this.props.todos.length !== 0 ? (
          <table
          >
            <thead>
              <tr>
                <th scope="col">Todos</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.todos.map(todo => (
                <tr key={todo.id}>
                  <td
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none"
                    }}
                  >
                    {todo.text} {todo.completed === true ? "(completed)" : ""}
                  </td>
                  <td>
                    <button
                      onClick={() => this.props.deleteTodo(todo.id)}
                    > delete </button>
                    <button
                      onClick={() => this.props.toggleTodo(todo.id)}
                    >toggle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div          >
            
              Todo List is empty or Filter results show no results
            
          </div>
        )}{" "}
      </div>
    );
  }
}



const mapStateToProps = state => {
  return { todos: state.todos
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);