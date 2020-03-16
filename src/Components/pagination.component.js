import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BootstrapTable, TableHeaderColumn} 
        from 'react-bootstrap-table'
        
import TableView from './table.component'

class Paginacation   extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Items : []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/products')
          .then(response => {
            this.setState({ Items: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
          
      }

      EditFunction = (cell, row) => {
        console.log("EditFunction"+row.id);
                return <label>
                    <button type="button" id="validatebutton"  onClick={() => this.props.handleEditProduct(row)} className="bbtn btn-primary btn-sm"><i className="fa fa-check fa-1x" aria-hidden="true"></i>
                    Edit</button>
                </label>
    
         
    }
    DeleteFunction = (cell, row) => {
      console.log("DeleteFunction"+row.id);
      return <label>
          <button type="button" id="validatebutton" onClick={() => this.handleDeleteProduct(row)} className="bbtn btn-primary btn-sm"><i className="fa fa-check fa-1x" aria-hidden="true"></i>
          Delete</button>
      </label>
    
    
    }

      viewRow(){
        return this.state.Items.map(function(Item, i){
            return <TableView obj={Item} key={i} />;
        });
      }
    
    render() {
      const options = {
        page: 4,
        prePage:  '⟵',
        nextPage: '⟶',
        firstPage: '⟸',
        lastPage: '⟹',
        paginationShowsTotal: this.showTotal
      }
        return (
            <div style={{marginTop: 10}}>
                <Link to={"/create"} className="btn btn-primary mb-3">Add Product</Link>
                <h3>Product List</h3>
                {/* <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.viewRow()}
                        </tbody>
                    </table> */}
                  <hr/>
                    <BootstrapTable data={this.state.Items}
                        pagination={true}
                        options={options}
        >
          <TableHeaderColumn isKey dataField='id' dataAlign="center"
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='name'dataAlign="center"
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='description' dataAlign="center"
          >
            Description
          </TableHeaderColumn>
          <TableHeaderColumn dataField='price' dataAlign="center"
          >
            Price
          </TableHeaderColumn>
         
          
          
          <TableHeaderColumn dataField="button" dataAlign="center" dataFormat={this.EditFunction}
          >
            Edit
          </TableHeaderColumn>
          <TableHeaderColumn dataField="button" dataAlign="center" dataFormat={this.DeleteFunction}
          >
            Delete
            
          </TableHeaderColumn>
        </BootstrapTable> 
                    
            </div>
        )
    }
}


export default Paginacation;