import React, { Component } from 'react';
import {ToDoBanner} from './TodoBanner';
import {ToDoCreator} from './ToDoCreator';
import {ToDoRow} from './ToDoRow';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName : "Ayoub",
      todoItems : [
        {action:"Buy Flowers", done:false},
        {action:"Get Shoes", done:false},
        {action:"Collect Tickets", done:true },
        {action:"Call Joe", done:true}]
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  } 

  createNewToDo = (task) => {
    if(!this.state.todoItems.find(item => item.action === task)){
        this.setState({
          todoItems:[...this.state.todoItems,
          {action : task,  done:false}],
        });
    }
  }

  toggleTodo = (todo) => {
    this.setState({
        todoItems : this.state.todoItems.map(item => item.action === todo.action ? 
          {...item, done: !item.done} : item)
    }); 
  }
  

  todoTableRows () {
    return (
      this.state.todoItems.map(item => 
      <ToDoRow key={item.action} item={item} callback={this.toggleTodo}/>
      )
    )
  }
  


  render(){
    return (
      <div>
        <ToDoBanner name={ this.state.userName} tasks={this.state.todoItems} />
        <ToDoCreator callback={this.createNewToDo}/>
        <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows()}</tbody>
        </table>
        
      </div>
    )
  };

}

