import React, { Component, Fragment } from 'react';

// material-ui
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
// import Modal from '@material-ui/core/Modal';

import * as axiosHelper from '../helpers/axiosHelper';


class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            mutually_follow_users: [],
            selectedUserId: "",
            description: "",
            blankSelectAlart: false,
            blankDescriptionAlart: false,
            modalState: false
        }
        this.clickDescriptionHandler = this.clickDescriptionHandler.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        this.onSentMessageClick = this.onSentMessageClick.bind(this);
        this.onExhibitR = this.onExhibitR.bind(this);
        this.onExhibitS = this.onExhibitS.bind(this);
    }

    async onGetMutuallyUser() {
        try {
            const response = await axios(axiosHelper.getMutuallyUserConfig());
            const clean_array = response.data
            const caluculated_array = clean_array.flat();
            this.setState((state) => {
                state.mutually_follow_users = caluculated_array;
            }, () => {console.log('mutually_follow_users', this.state.mutually_follow_users)});
        } catch(error){
            console.log(error.response.data);
        }
    }

    clickDescriptionHandler() {
        if(this.state.selectedUserId.length == 0 && this.state.description.length == 0) {
            return this.setState({ blankSelectAlart: true, blankDescriptionAlart: true });
        } else if(this.state.selectedUserId.length == 0) {
            return this.setState({ blankSelectAlart: true, blankDescriptionAlart: false });
        } else if(this.state.description.length == 0) {
            return this.setState({ blankSelectAlart: false, blankDescriptionAlart: true });
        } else {
            return this.setState({ blankSelectAlart: false, blankDescriptionAlart: false, modalState: true });
        }
    }

    handleChangeUser(e) {
        e.preventDefault();
        this.setState({ selectedUserId: e.target.value })
        if(this.state.blankSelectAlart == true) {
            return this.setState({ blankSelectAlart: false });
        }
    }

    handleChangeDescription(e) {
        e.preventDefault();
        this.setState({ description: e.target.value })
        if(this.state.blankDescriptionAlart == true) {
            return this.setState({ blankDescriptionAlart: false });
        }
    }

    // onSentMessageClick({e, receiver_id, description}){
    onSentMessageClick(e){
        const receiver_id = this.state.selectedUserId
        const description = this.state.description
        e.preventDefault();
        this.props.onSentMessage(receiver_id, description);
        this.setState({ selectedUserId:"", description:"", modalState:false });
    }
    // onSubmit(e) {
    //     const receiver_id = this.state.selectedUserId
    //     const description = this.state.description
    //     e.preventDefault();
    //     // this.props.onSentMessage(this.state.selectedUserId, this.state.description);
    //     this.props.onSentMessage(receiver_id, description);
    //     this.setState({ selectedUserId:"", description:"", modalState:false })
    // }


    onExhibitR(e) {
        e.preventDefault();
        this.props.onExhibitReceived();
    }

    onExhibitS(e) {
        e.preventDefault();
        this.props.onExhibitSend();
    }

    componentDidMount() {
        this.onGetMutuallyUser();
    }

    render() {
        // console.log('MessagePages props', this.props, this.state);
        return (
            <Fragment>
                <div className="sentListPane">
                    <div>
                        <FormControl variant="outlined" className="userSelect">
                            <InputLabel id="demo-simple-select-outlined-label">Who is it?</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={this.state.selectedUserId || ""}
                                onChange={this.handleChangeUser}
                                label="Searching for someone"
                            >
                                {this.state.mutually_follow_users.map((mutually_follow_user) =>
                                    <MenuItem key={mutually_follow_user.id} value={mutually_follow_user.id}>
                                        {mutually_follow_user.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    { this.state.blankSelectAlart == true && <div>Who is the person?</div> }
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Description"
                            value={this.state.description || ""}
                            onChange={this.handleChangeDescription}
                        />
                    </div>
                    { this.state.blankDescriptionAlart == true && <div>Please write Gratitude</div> }
                    <div>
                        <button
                            className="btn btn-secondary"
                            onClick={this.clickDescriptionHandler}
                        >
                            Sent message
                        </button>
                    </div>
                </div>
                { this.state.modalState == true &&
                    <div>
                        <div>{this.state.selectedUserId}</div>
                        <div>{this.state.description}</div>
                        <button
                            className="btn btn-secondary"
                            onClick={this.onSentMessageClick}
                        >
                            Submit
                        </button>
                    </div>
                }
                <div className="MessagesListPane">
                    <button className="btn btn-secondary"  onClick={this.onExhibitR}>ShowReceivedMessages</button>
                    {this.props.receivedMessages.map((receivedMessage) =>
                        <div key={receivedMessage.id}>
                            <span className="listMessage">{receivedMessage.description}</span>
                        </div>
                    )}
                </div>
                <div className="MessagesListPane">
                    <button className="btn btn-secondary"  onClick={this.onExhibitS}>ShowSendMessages</button>
                        {this.props.sendMessages.map((sendMessages) =>
                            <div key={sendMessages.id}>
                                <span className="listMessage">{sendMessages.description}</span>
                            </div>
                    )}
                </div>
            </Fragment>
        );
    }
}


export default Message;
