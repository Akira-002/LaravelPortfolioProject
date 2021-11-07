import React, { Component, Fragment } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import * as axiosHelper from '../helpers/axiosHelper';

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            mutually_follow_users: [],
            received_messages: [],
            send_messages: [],
            selectedUserId: "",
            description: "",
            blankSelectAlart: false,
            blankDescriptionAlart: false,
            modalState: false
        }
        this.clickDescriptionHandler = this.clickDescriptionHandler.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.receivedMessageExhibit = this.receivedMessageExhibit.bind(this);
        this.sendMessageExhibit = this.sendMessageExhibit.bind(this);
        this.sentMessageClicked = this.sentMessageClicked.bind(this);
        this.onSentMessageClick = this.onSentMessageClick.bind(this);
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
    async receivedMessageExhibit(){
        try {
            const { data } = await axios(axiosHelper.getReceivedMessagesConfig());
            this.setState((state) => {
                state.received_messages = data;
            }, () => {console.log('received_messages', this.state.received_messages)});

        } catch(error) {
            console.log(error.response.data);
        }
    }

    async sendMessageExhibit(){
        try {
            const { data } = await axios(axiosHelper.getSendMessagesConfig());
            this.setState((state) => {
                state.send_messages = data;
            }, () => {console.log('send_messages', this.state.send_messages)});

        } catch(error) {
            console.log(error.response.data);
        }
    }

    async sentMessageClicked(receiver_id, description){
        try {
            console.log("sentMessageClicked", receiver_id, description);
            const { data } = await axios(axiosHelper.postSentMessagesConfig(receiver_id, description));
            console.log('sentMessage response.data ', data);
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

    onSentMessageClick(e){
        const receiver_id = this.state.selectedUserId
        const description = this.state.description
        e.preventDefault();
        this.sentMessageClicked(receiver_id, description);
        this.setState({ selectedUserId:"", description:"", modalState:false });
    }

    componentDidMount() {
        this.onGetMutuallyUser();
        this.receivedMessageExhibit();
        this.sendMessageExhibit();
    }

    render() {
        return (
            <Fragment>
                <section className="p-message">
                    <div className="p-message__selector">
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
                    <div className="p-message__text">
                        <div className="p-message__text__block">
                            <TextField
                                id="standard-basic"
                                className="p-message__text__block__field"
                                label="Description"
                                value={this.state.description || ""}
                                onChange={this.handleChangeDescription}
                            />
                            <button
                                className="btn btn-secondary p-message__text__block__btn"
                                onClick={this.clickDescriptionHandler}
                            >
                                Sent message
                            </button>
                        </div>
                        <div className="p-message__text__attention">
                            { this.state.blankSelectAlart == true && <div>Who is the person?</div> }
                            { this.state.blankDescriptionAlart == true && <div>Please write Gratitude</div> }
                        </div>
                        { this.state.modalState == true &&
                            <div>
                                <div className="p-message__text__modal">
                                    <div>{this.state.description}</div>
                                    <button
                                        className="btn btn-secondary p-message__text__modal__btn"
                                        onClick={this.onSentMessageClick}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="p-message__container">
                        <div className="p-message__list">
                            <div className="p-message__list__title">Recieved Messages</div>
                            <div className="p-message__list__item">
                                {this.state.received_messages.map((received_message) =>
                                    <div key={received_message.id}>
                                        <span className="listMessage">{received_message.description}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-message__list">
                            <div className="p-message__list__title">Send Messages</div>
                            {this.state.send_messages.map((send_message) =>
                                <div key={send_message.id}>
                                    <p className="p-message__list__item">{send_message.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}


export default Message;
