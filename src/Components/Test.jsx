import React, { Component, Fragment } from 'react';

class Test extends Component {
    render() {
        return (
            <Fragment>
                <p>My favorite color is {this.props.editElement.id}.</p>;
            </Fragment>
        )
    }
}
export default Test;