import React, { Component } from 'react'
import './App.css';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import ExportToExcel from './ExportToExcel';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    })
    .then(response => response.json())
    .then(posts => {
      this.setState({posts: posts})
    })
  }

  deleteRow(id){
    const index = this.state.posts.findIndex(post => {
      return post.id === id
    });
    this.state.posts.splice(index, 1);
    this.setState({posts: this.state.posts})
  }

  render() {
    const data = this.state.posts;
    const columns = [
      {
        Header: "User ID",
        accessor: "userId",
        style:{
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "ID",
        accessor: "id",
        style:{
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: false,
        filterable: false

      },
      {
        Header: "Content",
        accessor: "body",
        sortable: false,
        filterable: false
      },
      {
        Header: "Actions",
        Cell: props => {
          return (
            <button style={{backgroundColor: "red", color: "white"}}
          onClick={(e) => {
            this.deleteRow(props.original.id);
          }}
          >Delete</button>
          )
        },
        sortable: false,
        filterable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100
      }
    ]
    return (
      <ReactTable
        className='-striped -highlight'
        columns={columns}
        data={data}
        filterable
        defaultPageSize={10}
       >

       {(state, filtredData, instance) => {
        this.reactTable = state.pageRows.map(post => {
          return post._original
        });
        return (
          <div>
            {filtredData()}
            <ExportToExcel posts={this.reactTable} />
          </div>
        )
       }}

       </ReactTable>
    )
  };
}

export default App;
