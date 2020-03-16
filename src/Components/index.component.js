import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TableView from './table.component'

import Pagination from './Paginacation'

class Index   extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Items : [],
            pageOfItems: []
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

      viewRow(){
        return this.state.Items.map(function(Item, i){
            return <TableView obj={Item} key={i} />;
        });
      }

      onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }
    
    render() {
        console.log(this.state.Items);
        return (
            <div style={{marginTop: 10}}>
                <Link to={"/create"} className="btn btn-primary mb-3">Add Product</Link>
<hr/>
                <Pagination items={this.state.Items} onChangePage={this.onChangePage} />

                <h3>Product List</h3>
                <table className="table">
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
                    </table>
                    
                    
            </div>
        )
    }
}


export default Index;