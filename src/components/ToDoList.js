import React, { Component } from 'react'
//todolist,currentToDoId,makeCurrent,cancelToDoUpdate,updateToDoItem,deleteToDoItem
//345465185

class ToDoList extends Component {

  state = {
    Text: this.props.currentToDo.Text,
    currentToDo: this.props.currentToDo
  }

  handleChange = (evt) => {
    // console.log('handleChange1', evt.target.value)

    // var updatedTodo = this.state.currentToDo;
    // updatedTodo.item = evt.target.value;

    this.setState({
      Text: evt.target.value
      // currentToDo: updatedTodo
    })

    //console.log('handleChange2', this.state.item)
  }

  handleSubmit = (evt) => {

    var updatedToDo = {
      _id: this.props.currentToDo._id,
      Text: this.state.Text
    }
    console.log('handleSubmit', updatedToDo)
    this.props.updateToDoItem(updatedToDo);
  }

  componentDidUpdate(nextProps, nextState) {
    //
    //
    //

    if (nextProps.currentToDo !== undefined) {
      if (nextProps.currentToDo.Text !== this.state.currentToDo.Text) {
        console.log('componentDidUpdate', nextProps.currentToDo)
        this.setState({
          currentToDo: nextProps.currentToDo,
          Text: nextProps.currentToDo.Text
        })
      }
    } else {
      //this.setState({currentToDo: { _id: '000', Text: '-' }})
    }

    //console.log('componentWillReceiveProps', this.state.item)
  }

  render() {

    console.log("render", this.props.currentToDo);

    // if (this.props.currentToDo !== undefined) {
    //   if (this.props.currentToDo._id !== this.state.currentToDo._id) {
    //     this.setState({
    //       currentToDo: this.props.currentToDo,
    //       Text: this.props.currentToDo.Text
    //     });
    //   }
    // }

    var list = this.props.todolist.map(todo => {

      return (
        <div>
          <ul className="todo-list">
            {todo._id === this.props.currentToDo._id ?
              <li key={todo._id}>

                <div className="editForm">
                
                  <input id="newItem" type="text" value={this.state.Text}
                    onChange={this.handleChange}></input>

                  <button onClick={() => this.props.cancelToDoUpdate()} >
                    <i className="material-icons icon-black">cancel</i>
                  </button>
                  <button onClick={() => { this.handleSubmit(this.state.Text) }}>
                    <i className="material-icons icon-black">save</i>
                  </button>
                </div>
              </li>
              :
              <li key={todo._id} onClick={() => this.props.makeCurrent(todo._id)}>{todo.Text}
               
                <button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.deleteToDoItem(todo._id) }}>
                  <i className="material-icons icon-black">delete</i>
                </button>
              </li>
            }
          </ul>
        </div>
      )
    })
    return (
      <div className="todo-list-container">
       
          {list}
       
      </div>
    )
  }
}

export default ToDoList;