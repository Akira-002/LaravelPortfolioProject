import React, { Fragment } from 'react';

const Message = ({messages}) => {

    if(!messages) {
        return (
            <Fragment>
                <div>No Message was selected lol</div>
            </Fragment>
        )
    }
    return (
        <div className="MessagesListPane">
            {messages.map((message) =>
                <div key={message.id}>
                    {/* <div>{message.title}</div> */}
                    <div>{message.description}</div>
                </div>
            )}
        </div>
    );
}

export default Message;
