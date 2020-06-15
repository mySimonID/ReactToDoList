import { Component } from 'react'

import axios from 'axios'

const baseURL = 'http://localhost:49160/';

class DBServer extends Component {

  //
  getData = () => {
    return new Promise(function (resolve, reject) {

      axios.get(baseURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        }
      }).then(response => {resolve(response)})
        .catch(error =>  {reject('ERROR: getData: ' + error)});
    });
  };

  //
  getToDo = (itemid) => {
    return new Promise(function(resolve, reject) {
      axios.get(baseURL + 'todo/' + itemid)
      .then(response => {
        resolve(response);
        // console.log('makeCurrent3', this.state);
      }).catch(error => reject('Error: getToDo: ' + error));
    })
  }

  //
  add = (todo) => {
    return new Promise(function(resolve, reject) {
      if (todo) {
        axios.post(baseURL + 'new', todo)
          .then(response => { resolve(response) })
          // .catch(reject('ERROR'))
      } else {
        reject('ERROR - No data')
      }
    })
  }

  //
  update = (todo) => {
    return new Promise(function (resolve, reject) {
      if (todo) {
        axios.post(baseURL + 'save/' + todo._id, todo)
          .then(response => { resolve(response) })
          // .catch(reject('ERROR'))
      } else {
        reject('ERROR - No data')
      }
    });
  }

  //
  delete = (itemid) => {
    return new Promise(function (resolve, reject) {
      axios.post(baseURL + 'delete/' + itemid, itemid)
        .then(response => { resolve(response) })
        // .catch(reject('ERROR'))
    });
  }

};

export default DBServer