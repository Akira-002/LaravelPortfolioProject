import React, { Component } from 'react';

class AddMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMessage: {
                // title: '',
                description: '',
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* Dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.newMessage);
        state[key] = e.target.value;
        this.setState({newMessage: state });
    }
    /* Invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault = prevents page reload
        e.preventDefault();
        this.props.onAdd(this.state.newMessage);
    }


    render() {
        return(
            <div>
                <div>Add New Message</div>
                <form onSubmit={this.handleSubmit}>
                    {/* <label>
                        Title:
                        <input type="text" onChange={(e)=>this.handleInput('title',e)} />
                    </label> */}
                    <label>
                        Description:
                        <input type="text" onChange={(e)=>this.handleInput('description',e)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default AddMessage;
