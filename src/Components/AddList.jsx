import React, { PureComponent } from 'react'
import axios from 'axios'


class AddList extends PureComponent {

    constructor(props) {
        super(props);
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
            formValid: true,
            isEdit: false

        }
        console.log(this.props);
        if(this.props.editElement){
            this.setState({isEdit: true})
        }
    }


    handleEvent = event => {
        const name = event.target.name;
        const value = event.target.value;

        // this.setState({ [name]: value }, () => {
        //     this.validateField(name, value);
        // });
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
                fieldValidationErrors.id = idValid ? " " : "Please enter only number less than 100";
                //console.log(fieldValidationErrors.id);
                break;
            case "name":
                nameValid = value.match(/^[A-Za-z]*$/);
                fieldValidationErrors.name = nameValid ? " " : "Please enter only strings";
                //console.log(fieldValidationErrors.name);
                break;
            case "description":
                descriptionValid = value.match(/^[A-Za-z ]*$/);
                fieldValidationErrors.description = descriptionValid ? " " : "Please enter only strings";
                //console.log(fieldValidationErrors.description);
                break;
            case "price":
                priceValid = value.match(/^[0-9]*$/);
                fieldValidationErrors.price = priceValid ? " " : "Please enter only number less than 100";
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
        if(this.state.isEdit){
            axios.put('http://localhost:5000/products/'+this.state.id, {  name: this.state.name, description: this.state.description, price: this.state.price })
            .then(res => {
                console.log(res.data);
            })
        }else{
        axios.post('http://localhost:5000/products', { id: this.state.id, name: this.state.name, description: this.state.description, price: this.state.price })
            .then(res => {
                console.log(res.data);
            })
        }

    }

    render() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Id:</label>
                            <input type="text"
                                value={this.props.editElement.id || ''}
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
                                value={this.props.editElement.name || ''}
                                name="name"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Name" />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text"
                                value={this.props.editElement.description || ''}
                                name="description"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Description" />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text"
                                value={this.props.editElement.price || ''}
                                name="price"
                                className="form-control"
                                onChange={this.handleEvent}
                                placeholder="Enter Price" />
                        </div>
                        <button disabled={!this.state.formValid} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddList
