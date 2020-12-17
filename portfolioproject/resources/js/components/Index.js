import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Portfolioproject extends Component {
    constructor (props) {
        super(props)
        this.state = {
          name: '',
          description: ''
        }

        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmitButton = this.onSubmitButton.bind(this);
    }

    onChangeValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmitButton(e) {
        e.preventDefault();

        axios.post('/formSubmit', {
            name: this.state.name,
            description: this.state.description
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

        this.setState({
            name: '',
            description: ''
        })
    }

    componentDidMount () {
    }

    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Welcome React World in Laravel</div>

                            <div className="card-body">Hello I'm an React component!
                                <form onSubmit={this.onSubmitButton}>
                                    <strong>Name:</strong>
                                    <input type="text" name="name" className="form-control"value={this.state.name} onChange={this.onChangeValue} />
                                    <strong>Description:</strong>
                                    <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChangeValue}></textarea>
                                    <button className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Portfolioproject;

if (document.getElementById('portfolioproject')) {
    ReactDOM.render(<Portfolioproject />, document.getElementById('portfolioproject'));
}
