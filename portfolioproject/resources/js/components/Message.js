import React from 'react';

const Message = ({messages}) => {

    if(!messages) {
        return (
            <div>
                <div>No Message was selected lol</div>
            </div>
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
