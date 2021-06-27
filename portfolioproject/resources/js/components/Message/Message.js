import React, { Component, Fragment } from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedUserId: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onExhibitR = this.onExhibitR.bind(this);
        this.onExhibitS = this.onExhibitS.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ selectedUserId: e.target.value })
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
        console.log('MessagePages props', this.props, this.state);
        return (
            <div>
                <FormControl variant="outlined" className="userSelect">
                    <InputLabel id="demo-simple-select-outlined-label">Who is it?</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.selectedUserId || ""}
                        onChange={this.handleChange}
                        label="Searching for someone"
                    >
                        {this.props.users.map((user) =>
                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
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
