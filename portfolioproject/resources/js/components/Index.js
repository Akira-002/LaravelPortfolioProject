import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import AddMessage from './AddMessage';

export default class Portfolioproject extends Component {

    constructor() {
        super();
        this.state = {
            messages: []
        }

        this.handleAddMessage = this.handleAddMessage.bind(this);
    }

    componentDidMount() {
        fetch('api/messages', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(messages => {
                this.setState({messages});
            });
    }

    handleAddMessage(message) {

        /*Fetch API for post request */
        fetch( 'api/messages/', {
            method:'post',
            /* headers are important*/
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(message)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            this.setState((prevState)=> ({
                messages: prevState.messages.concat(data),
            }))
        })
        //update the state of messages
    }

    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Welcome React World in Laravel</div>
                            <div className="card-body">Hello I'm an React component!</div>
                        </div>
                        <Message messages={this.state.messages} />
                        <AddMessage onAdd={this.handleAddMessage} />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('portfolioproject')) {
    ReactDOM.render(<Portfolioproject />, document.getElementById('portfolioproject'));
}
