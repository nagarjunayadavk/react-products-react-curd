import React, { Component } from 'react';
import axios from 'axios'

class Edit  extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             id: '',
             name: '',
             description: '',
             price: ''
        }
    }


    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:5000/products/'+this.props.match.params.id)
            .then(response => {
                this.setState({ 
                  id: response.data.id, 
                  name: response.data.name,
                  description: response.data.description,
                  price: response.data.price
                });
            })
            .catch(function (error) {
                console.log(error);
            })
      }

      
    handleEvent = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const obj = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
          };

          axios.put('http://localhost:5000/products/'+this.props.match.params.id, obj)
              .then(res => console.log(res.data));
          
          this.props.history.push('/index');
    }

    render() {
        return (
            <div>
                <div>
                <div style={{marginTop: 10}}>
                <h3>Add New Business</h3>
                <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Id:</label>
                            <input type="text"
                                value={this.state.id}
                                name="id"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Id" />
                        </div>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                value={this.state.name}
                                name="name"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text"
                                value={this.state.description}
                                name="description"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Description" />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text"
                                value={this.state.price}
                                name="price"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Price" />
                        </div>
                        <button className="btn btn-success pl-5 pr-5">Submit</button>
                    </form>
            </div>
            </div>
            </div>
        )
    }
}


export default Edit;