import React, { Fragment } from 'react';
import Message from '../../Message/Message';
// import AddMessage from '../../Message/AddMessage';

const DashboardPage = (props) => {
  console.log('DashbordPages state', props);
  return(
    <Fragment>
      <div className="jumbotron">
        <Message {...props}/>
          {/* <AddMessage onAdd={this.handleAddMessage} /> */}
      </div>

      {/* <button className="btn btn-secondary btn-lg" onClick={()=> {props.history.push('/')}}>Go Back to the Homepage </button> */}
      {/* <button className="btn btn-secondary btn-lg" onClick={()=> {props.history.push('/message')}}>Go to the MessagePane </button> */}
    </Fragment>
  )
}

export default DashboardPage;