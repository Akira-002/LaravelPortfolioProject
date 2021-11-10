import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// axios
import * as axiosHelper from '../helpers/axiosHelper';

// Auth/screens
import Navbar from '../screens/Navbar';
import HomePage from '../screens/HomePage';
import LoginPage from '../screens/LogIn';
import RegisterPage from '../screens/Register';
import DashboardPage from '../screens/Dashboard';
import ErrorsAlert from '../helpers/ErrorsAlert';
import InitSearch from '../Search/InitSearch';


export default class AuthApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            appName: 'Laravel-Passport+React Gratia',
            isLoggedIn: false,
            currentUser: {},
            token: null,
            errors:[] //logout errors
        }
        this.registrationSubmit = this.registrationSubmit.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    async registrationSubmit(formData){
        try {
            const { data } = await axios(axiosHelper.registerSubmitConfig(formData));
            localStorage.setItem("userToken", JSON.stringify(data.token));
            this.setState({ isLoggedIn: true, ...data });
        } catch(error){
            this.setState({ errors: [error.response.data.message]});
        }
    }

    async logoutClicked(successCallback, errorCallback){
        try {
            const {data} = await axios(axiosHelper.getLogoutConfig(this.state.token))
            localStorage.removeItem("userToken");
            successCallback();
            this.setState({ isLoggedIn: false, currentUser: {}, token: null });
        } catch(error){
            errorCallback();
            this.setState({ errors: [error.response.data.message]});
        }
    }

    async loginClicked(formData,successCallback, errorCallback){
        try {
            const { data } = await axios(axiosHelper.getLoginConfig(formData));
            localStorage.setItem("userToken", JSON.stringify(data.token));
            successCallback();
            this.setState({ isLoggedIn: true, ...data });
        } catch(error) {
            errorCallback( error && error.response.data || {error: "Unprocessable entity"});
        }
    }


  render() {
        let userFeedback;
        if (this.state.errors.length !== 0) {
            userFeedback = (<ErrorsAlert {...this.state} />);
        }

        return (
            <Router>
                <Navbar
                    isLoggedIn={this.state.isLoggedIn}
                    logoutClicked={this.logoutClicked}
                    appName={this.state.appName}
                />
                {userFeedback}
                <Switch>
                    <Route exact path="/" render={() =><HomePage {...this.state}/>} />
                    <Route exact path="/login" render={(props) => (<LoginPage onLogin={this.loginClicked} {...props} />)} />
                    <Route exact path="/register" render={(props) => (<RegisterPage onRegister={this.registrationSubmit} {...props}/>)} />
                    <Route exact path="/dashboard" render={() => (<DashboardPage />)} />
                    <Route exact path="/search" render={() => (<InitSearch/>)} />
                    <Route render={() => <p>not found.</p>} />
                </Switch>
            </Router>
        );
    }
}

