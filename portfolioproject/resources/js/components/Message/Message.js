import React, { Component, Fragment } from 'react';

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.onExhibitR = this.onExhibitR.bind(this);
        this.onExhibitS = this.onExhibitS.bind(this);
    }

    onExhibitR(e) {
        e.preventDefault();
        this.props.onExhibitReceived();
    }

    onExhibitS(e) {
        e.preventDefault();
        this.props.onExhibitSend();
    }

    render() {
        console.log('MessagePages props', this.props);
        return (
            <div>
                <div className="MessagesListPane">
                    <button className="btn btn-secondary"  onClick={this.onExhibitR}>ShowReceivedMessages</button>
                    {this.props.receivedMessages.map((receivedMessage) =>
                        <div key={receivedMessage.id}>
                            {/* <div>{message.title}</div> */}
                            <span className="listMessage">{receivedMessage.description}</span>
                        </div>
                    )}
                </div>
                <div className="MessagesListPane">
                    <button className="btn btn-secondary"  onClick={this.onExhibitS}>ShowSendMessages</button>
                        {this.props.sendMessages.map((sendMessages) =>
                            <div key={sendMessages.id}>
                                {/* <div>{message.title}</div> */}
                                <span className="listMessage">{sendMessages.description}</span>
                            </div>
                    )}
                </div>
            </div>
        );
    }
}


export default Message;
