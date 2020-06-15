import React, { Component } from 'react'

class AddToDo extends Component {

  state = {
    Text: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addToDoItem(this.state);
  }


  render() {
    return (

      <div>
        <div className="todo-form-container">

          <form onSubmit={this.handleSubmit}>
            <div className="inputButton">
              <input type="text" id="Text" onChange={this.handleChange} placeholder="Add new todo item..." />

              <button><i className="material-icons icon-black">check</i></button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddToDo