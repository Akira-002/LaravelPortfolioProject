import React, { Fragment } from 'react';
import Message from '../../Message/Message';
// import AddMessage from '../../Message/AddMessage';

const DashboardPage = (props) => (
      <Fragment>
        <div className="jumbotron">
          <div>
            <div>Show Message From {props.user.name}</div>
            <div>ここに Send Message 一旦List表示</div>
            {/* <Message messages={this.state.messages} /> */}
          </div>
          <div>
            <div>Show Message To {props.user.name}</div>
            <div>ここに Received Message 一旦List表示</div>
          </div>
          <div>
            <div>Sent Message Pane</div>
            <div>ここに Sent Message 一旦SentMEssagePane表示</div>
            {/* <AddMessage onAdd={this.handleAddMessage} /> */}
          </div>
        </div>
        <button className="btn btn-secondary btn-lg" onClick={()=> {props.history.push('/')}}>Go Back to the Homepage </button>
        <button className="btn btn-secondary btn-lg" onClick={()=> {props.history.push('/message')}}>Go to the MessagePane </button>
      </Fragment>
    )

export default DashboardPage;