import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Auth/helpers
import * as axiosHelper from './helpers/axiosHelper';

// Auth/screens
// import SignInOrUp from './screens/SignInOrUp';
import Navbar from './screens/Navbar';
import HomePage from './screens/HomePage';
import LoginPage from './screens/Login';
import RegisterPage from './screens/Register';
import DashboardPage from './screens/Dashboard';
import ErrorsAlert from './screens/ErrorsAlert';

// ../containers
// import Portfolioproject from '../Portfolioproject';



// export const HomePage = (props) => {
//   console.log('HomePage state', props);
//   //If the user is loggedIn provide a welcome alert
//   let userFeedback;

//   if(props.isLoggedIn){
//     userFeedback = (
//       <div className="alert alert-success" role="alert">
//           <h3>You are currently logged in as {props.currentUser.name}</h3>
//           <p>You have a token to "track your session"</p>
//       </div>
//     )
//   } else {//if not invite him to do so
//     userFeedback = (
//       <div className="alert alert-warning" role="alert">
//           <h3>You are not currently logged in</h3>
//           <p>Log in to get an access token</p>
//           <Link className="btn btn-primary btn-large" to="/login">LogIn</Link>
//       </div>
//     )
//   }

//   return (
//     <Fragment>
//       {userFeedback}
//     </Fragment>
//   );
// }

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

    //binding to preserve the context of this
    this.registrationSubmit = this.registrationSubmit.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  //callbacks will be used in the descendant component
  async registrationSubmit(formData, successCallback, errorCallback){
    console.log('formData', formData);
    try {
      const {data} = await axios.post('/api/register', {...formData});
      console.log(data);
      successCallback();

      //data contains currentUser and token
      this.setState({ isLoggedIn: true, ...data });
    } catch(error){
      console.log(error.response.data);
      errorCallback(error.response.data.errors);
    }
  }

  //callbacks will be used in the descendant component
  async logoutClicked(successCallback, errorCallback){
    try {
      const {data} = await axios(axiosHelper.getLogoutConfig(this.state.token));
      successCallback();
      this.setState({ isLoggedIn: false, currentUser: {}, token: null });
    } catch(error){
      errorCallback();
      console.log(error.response.data);
      this.setState({ errors: [error.response.data.message]});
    }
  }

  //callbacks will be used in the descendant component
  async loginClicked(formData,successCallback, errorCallback){
    try {
      const { data } = await axios(axiosHelper.getLoginConfig(formData));
      console.log('login response.data ', data);
      successCallback();
      this.setState({ isLoggedIn: true, ...data });
    } catch(error) {
      errorCallback( error && error.response.data || {error: "Unprocessable entity"});
    }
  }

  render() {
    console.log('AppComponent state ', this.state);
    //HANDLE INPUT ERRORS
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
            <Route exact path="/" render={(props) =><HomePage {...this.state}/>} />
            <Route exact path="/login" render={(props) => (<LoginPage onLogin={this.loginClicked} {...props} />)} />
            <Route exact path="/register" render={(props) => (<RegisterPage onRegister={this.registrationSubmit} {...props}/>)} />

            {/* <Route exact path="/signin"
              render={(props) => (<SignInOrUp onLogin={this.loginClicked} onRegister={this.registrationSubmit} {...props}/>)}
            /> */}
            <Route exact path="/dashboard" render={(props) => (<DashboardPage {...props} user={this.state.currentUser} />)} />
            {/* <Route exact path="/" component={Portfolioproject} logoutClicked={this.logoutClicked} /> */}
            <Route render={() => <p>not found.</p>} />
          </Switch>
      </Router>
    );
  }
}