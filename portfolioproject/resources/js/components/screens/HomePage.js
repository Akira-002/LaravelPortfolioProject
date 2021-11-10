import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    let userFeedback;
    if(props.isLoggedIn){
      userFeedback = (
        <div className="alert alert-success" role="alert">
            <h3>You are currently logged in as {props.currentUser.name}</h3>
            <p>You have a token to "track your session"</p>
        </div>
      )
    } else {
      userFeedback = (
        <div className="alert alert-warning" role="alert">
            <h3>You are not currently logged in</h3>
            <p>Log in to get an access token</p>
            <Link className="btn btn-primary btn-large" to="/login">Login</Link>
        </div>
      )
    }

    return (
      <Fragment>
        {userFeedback}
      </Fragment>
    );

}



export default HomePage;
