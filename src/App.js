import React, { Component } from 'react';


import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'

import './styles.css';
import DBServer from './db/dbServer';

var dbServer = new DBServer();

class App extends Component {

  state = {
    todolist: [
      { _id: "001", Text: 'First' },
      { _id: "002", Text: 'Second' },
      { _id: "003", Text: 'Third' },
    ],
    currentToDo: { _id: '', Text: '' },
  }

  componentDidMount() {
    this.getData();
  }

  addToDoItem = (todo) => {

    const newToDo = {
      Text: todo.Text
    };

    if (todo) {
      var promise = dbServer.add(newToDo);
      promise.then((response) => {
        this.getData();
      }).catch(error => {
        console.log('Error:' + error.message)
      });
    }
  }

  deleteToDoItem = (itemid) => {
    //
    console.log("deleteToDoItem", itemid);
    //
    var promise = dbServer.delete(itemid);
    promise.then((response) => {
      this.getData();
    }).catch(error => {
      console.log('Error:' + error.message)
    });
  }

  updateToDoItem = (todo) => {
    console.log('updateToDoItem', todo);

    if (todo) {
      var promise = dbServer.update(todo);
      promise.then((response) => {
        this.getData();
      }).catch(error => {
        console.log('Error:' + error.message)
      });

    }
  }

  getData = () => {
    console.log('Getting Data')

    var promise = dbServer.getData();
    promise.then((response) => {
      this.setState({
        todolist: response.data,
        currentToDo: { _id: '000', Text: '-' }
      });
    }).catch(error => {
      console.log('Error:' + error.message)
    });
  }

  makeCurrent = (itemid) => {
    console.log('makeCurrent', itemid);

    var promise = dbServer.getToDo(itemid);
    promise.then((response) => {
      console.log('makeCurrent2', response.data);

      this.setState({
        currentToDo: response.data ? response.data : { _id: '', Text: '' },
      });
    }).catch(error => {
      console.log('Error:' + error.message)
    });

  }

  cancelToDoUpdate = () => {
    console.log('cancelToDoUpdate');
    this.setState({ currentToDo: { _id: '000', Text: '' } })
  }

  render() {
    return (
      <div className="todoList-container" >
        <h1>react - ToDoList</h1>
        <AddToDo addToDoItem={this.addToDoItem} />
        <ToDoList todolist={this.state.todolist}
          currentToDo={this.state.currentToDo}
          makeCurrent={this.makeCurrent}
          cancelToDoUpdate={this.cancelToDoUpdate}
          updateToDoItem={this.updateToDoItem}
          deleteToDoItem={this.deleteToDoItem} />
      </div>
    )
  };
}

export default App;
