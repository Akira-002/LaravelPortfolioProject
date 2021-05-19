import React, { Component } from 'react';
import Message from './Message';
import AddMessage from './AddMessage';

export default class Portfolioproject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            // token = this.props.token
        }

        this.handleAddMessage = this.handleAddMessage.bind(this);
    }

    // componentDidMount() {
    //     fetch('api/sendmessages', {
    //         mode: 'cors',
    //         headers : {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             // 'Authorization': 'Bearer' + this.props.token
    //         }
    //     })
    //         .then(response => {
    //             return response.json();
    //         })
    //         .then(messages => {
    //             this.setState({messages});
    //         });
    // }

    // handleAddMessage(message) {

    //     /*Fetch API for post request */
    //     fetch( 'api/messages/', {
    //         method:'post',
    //         /* headers are important*/
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         },

    //         body: JSON.stringify(message)
    //     })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then( data => {
    //         this.setState((prevState)=> ({
    //             messages: prevState.messages.concat(data),
    //         }))
    //     })
    //     //update the state of messages
    // }

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