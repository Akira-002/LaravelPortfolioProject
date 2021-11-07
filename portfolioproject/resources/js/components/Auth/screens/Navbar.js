import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Navbar extends Component {
  constructor(props){
    super(props);

    this.logoutBtnClicked = this.logoutBtnClicked.bind(this);
    this.backToTheHomePage = this.backToTheHomePage.bind(this);
  }

  backToTheHomePage(){
    this.props.history.push('/');
  }

  logoutBtnClicked(){
    this.props.logoutClicked(this.backToTheHomePage,this.backToTheHomePage);
  }

  render() {
    let authLinks;
    if (!this.props.isLoggedIn){
      authLinks = (
        <Fragment>
          <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
          <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
        </Fragment>
      )
    } else {
      authLinks = (
        <Fragment>
          <NavLink className="nav-item nav-link" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-item nav-link" to="/search">SearchUser</NavLink>
          <button className="ml-5 btn btn-danger" onClick={this.logoutBtnClicked}>Logout</button>
        </Fragment>
      )
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">{this.props.appName}</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {authLinks}
          </div>
        </div>
      </nav>

    );
  }
}

//passes match, history, location to Component
export default withRouter(Navbar);
