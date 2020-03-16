import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';



class TableView extends Component {

    delete = () => {
        axios.delete('http://localhost:5000/products/'+this.props.obj.id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }


    render() {
      return (
          <tr>
            <td>
              {this.props.obj.id}
            </td>
            <td>
              {this.props.obj.name}
            </td>
            <td>
              {this.props.obj.description}
            </td>
            <td>
              {this.props.obj.price}
            </td>
            <td>
            <Link to={"/edit/"+this.props.obj.id} className="btn btn-info">Edit</Link>
            </td>
            <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
            </td>
          </tr>
      );
    }
  }
  
  export default TableView;