import React, { Component, Fragment } from 'react';

import AddList from './AddList.jsx';

import axios from 'axios';
import Test from './Test.jsx';



class Home extends Component {
        state = {
             Lists : [],
            //  editList : {},
             editElement: {}
        }
    
    componentDidMount(){
        axios.get(`http://localhost:5000/products`)
        .then( res =>  
            //console.log(res)
            this.setState({Lists : res.data})
        )
    }

    handleEdit = (id) => {
        axios.get(`http://localhost:5000/products/`+ id)
        .then( (res) => {  
            console.log(res.data);
            // this.setState({edit : res.data})
            // this.setState({editList : "nagagirish"})
            this.setState({editElement : res.data})
        });
    }

    handleDelete = (list) => {
        //alert(list.id)
        //event.preventDefault();
        axios.delete(`http://localhost:5000/products/`+list.id)
        .then( res =>  
            //console.log(res)
            this.setState({Lists : res.data})
            
        )
    }

    render() {
        return (
            <Fragment>
            <div className="container">
            <AddList editElement={this.state.editElement}/>
            <Test editElement={this.state.editElement}/>
            <br/>
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
                {this.state.Lists.map(List => (
                <tr key={List.id}>
                    <td>{List.id}</td>
                    <td>{List.name}</td>
                    <td>{List.description}</td>
                    <td>{List.price}</td>
                    <td><button onClick={() => this.handleEdit(List.id)} className="btn btn-info">Edit</button></td>
                    <td><button onClick={() => this.handleDelete(List)} className="btn btn-danger">Delete</button></td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
            </Fragment>
        )
    }
}

export default Home
