import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';

export default class Portfolioproject extends Component {

    constructor() {
        super();
        this.state = {
            messages: []
        }
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
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('portfolioproject')) {
    ReactDOM.render(<Portfolioproject />, document.getElementById('portfolioproject'));
}
