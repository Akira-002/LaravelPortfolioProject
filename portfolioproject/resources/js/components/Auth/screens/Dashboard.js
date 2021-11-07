import React, { Fragment } from 'react';
import Message from '../../Message/Message';

const DashboardPage = (props) => {
  return(
    <Fragment>
        <Message {...props}/>
    </Fragment>
  )
}

export default DashboardPage;
