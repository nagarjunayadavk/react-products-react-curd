import React, { Component } from 'react';

import axios from 'axios'

class Create extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             id: '',
             name: '',
             description: '',
             price: '',

             idValid: false,
             nameValid: false,
             descriptionValid: false,
             priceValid: false,
             formErrors: { id: "", name: "", description: "", price: "" },
             formValid: false
        }
    }

    handleEvent = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    }


    validateField(fieldName, value) {
        let idValid = this.state.idValid;
        let nameValid = this.state.nameValid;
        let descriptionValid = this.state.descriptionValid;
        let priceValid = this.state.priceValid;
        let fieldValidationErrors = this.state.formErrors;


        switch (fieldName) {
            case "id":
                idValid = value.match(/^[0-9]*$/);
                fieldValidationErrors.id = idValid ? " " : "Number Required Number type only";
                //console.log(fieldValidationErrors.id);
                break;
            case "name":
                nameValid = value.match(/^[A-Za-z]*$/);
                fieldValidationErrors.name = nameValid ? " " : "Name Required String type only";
                //console.log(fieldValidationErrors.name);
                break;
            case "description":
                descriptionValid = value.match(/^[A-Za-z ]*$/);
                fieldValidationErrors.description = descriptionValid ? " " : "Number Required Number type only";
                //console.log(fieldValidationErrors.description);
                break;
            case "price":
                priceValid = value.match(/^[0-9]*$/);
                fieldValidationErrors.price = priceValid ? " " : "Name Required String type only";
                //console.log(fieldValidationErrors.price);
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            idValid: idValid,
            descriptionValid: descriptionValid,
            priceValid: priceValid
        },
            this.validateForm
        );

    }

    validateForm() {
        this.setState({
            formValid: this.state.idValid && this.state.descriptionValid
                && this.state.priceValid
        });
    }


    handleSubmit = event => {
    event.preventDefault();
    
    const obj = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price
    };
    
    axios.post('http://localhost:5000/products', obj)
        .then(res => console.log(res.data));
    
    this.setState({
      id: '',
      name: '',
      description: '',
      price: ''
    })
    }
    
    render() {
        return (
            <div>
                <div style={{marginTop: 10}}>
                <h3>Add Product</h3>
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
                        {this.state.formErrors.id ?
                            (<small className="text-danger"> {this.state.formErrors.id}</small>)
                            : null}
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                value={this.state.name}
                                name="name"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Name" />
                        </div>
                        {this.state.formErrors.name ?
                            (<small className="text-danger"> {this.state.formErrors.name}</small>)
                            : null}
                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text"
                                value={this.state.description}
                                name="description"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Description" />
                        </div>
                        {this.state.formErrors.description ?
                            (<small className="text-danger"> {this.state.formErrors.description}</small>)
                            : null}
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text"
                                value={this.state.price}
                                name="price"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Price" />
                        </div>
                        {this.state.formErrors.price ?
                            (<small className="text-danger"> {this.state.formErrors.price}</small>)
                            : null}
                            <br/>
                        <button disabled={!this.state.formValid} className="btn btn-success pl-5 pr-5">Submit</button>
                    </form>
            </div>
            </div>
        )
    }
}


export default Create;