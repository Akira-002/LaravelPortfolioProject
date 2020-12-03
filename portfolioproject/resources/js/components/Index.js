import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Portfolioproject extends Component {
    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Welcome React World in Laravel</div>

                            <div className="card-body">Hello I'm an React component!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('portfolioproject')) {
    ReactDOM.render(<Portfolioproject />, document.getElementById('portfolioproject'));
}
