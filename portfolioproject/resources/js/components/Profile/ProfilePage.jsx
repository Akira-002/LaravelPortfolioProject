import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import * as axiosHelper from '../helpers/axiosHelper';

export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUserProfile: {},
            newName: "",
            newEmail: "",
            editProfileState: false,
            editNameState: false,
            editEmailState: false,
            blankAlart: false,
            rewrited: false,
            rewriedEmail: false,
        }
        this.showProfileClicked = this.showProfileClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editProfileSubmit = this.editProfileSubmit.bind(this);
        this.newNameSubmited = this.newNameSubmited.bind(this);
        this.newEmailSubmited = this.newEmailSubmited.bind(this);
    }

    async showProfileClicked(){
        try {
            const { data } = await axios(axiosHelper.getProfile());
            this.setState({ currentUserProfile: data });
        } catch(error) {
            this.setState({ errors: [error.response.data.message]});
        }
    }

    async newNameSubmited(new_name){
        try {
            const response = await axios(axiosHelper.editProfileName(new_name));
            console.log("response", response);
        } catch(error){
            this.setState({ errors: [error.response.data.message]});
        }
    }

    async newEmailSubmited(new_email){
        try {
            const response = await axios(axiosHelper.editProfileEmail(new_email));
            console.log("response", response);
        } catch(error){
            this.setState({ errors: [error.response.data.message]});
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    editProfileSubmit(e) {
        if(this.state.newName !== "" && this.state.newEmail !== "") {
            const new_name = this.state.newName;
            const new_email = this.state.newEmail;
            this.newNameSubmited(new_name);
            this.newEmailSubmited(new_email);
            this.setState({newName: "", editNameState: true, newEmail: "", editEmailState: true, rewrited: true, editProfileState: false});
        } else if(this.state.newName !== "" && this.state.newEmail == "") {
            const new_name = this.state.newName;
            this.newNameSubmited(new_name);
            this.setState({newName: "", editNameState: true, rewrited: true, editProfileState: false});
        } else if(this.state.newEmail !== "" && this.state.newName == "") {
            const new_email = this.state.newEmail;
            this.newEmailSubmited(new_email);
            this.setState({newEmail: "", editEmailState: true, rewrited: true, editProfileState: false});
        } else if(this.state.newName == "" && this.state.newEmail == "") {
            // TODO
            this.setState({blankAlart: true})
        }
    }


    componentDidMount() {
        this.showProfileClicked();
    }
    componentDidUpdate() {
        this.showProfileClicked();
    }


    render() {
        return(
            <Fragment>
                <button className="btn c-icon__btn" onClick={()=>{
                    if(this.state.editProfileState == false) {
                        this.setState({editProfileState: true})
                    } else { this.setState({editProfileState: false}) }
                }}>
                    {this.state.editProfileState == false && <p>プロフィールを編集する</p>}
                    {this.state.editProfileState == true && <p>編集はやっぱやめとく</p>}
                </button>
                <div>{this.state.currentUserProfile.name}</div>
                {this.state.editProfileState == true &&
                    <TextField
                        id="standard-basic"
                        className="p-message__text__block__field"
                        label="New Name"
                        value={this.state.newName || ""}
                        onChange={this.handleChange}
                        name="newName"
                    />
                }
                <div>{this.state.currentUserProfile.email}</div>
                {this.state.editProfileState == true &&
                        <TextField
                            id="standard-basic"
                            className="p-message__text__block__field"
                            label="New Email Address"
                            value={this.state.newEmail || ""}
                            onChange={this.handleChange}
                            name="newEmail"
                        />
                }
                {this.state.editProfileState == true &&
                <div>
                    <button
                        className="btn c-icon__btn p-message__text__modal__btn"
                        onClick={this.editProfileSubmit}
                    >
                        Submit
                    </button>
                </div>
                }
                {this.state.rewrited == true &&
                    <Fragment>
                        {this.state.editNameState == true && <p>名前が変更されました</p>}
                        {this.state.editEmailState == true && <p>メールアドレスが変更されました</p>}
                        <button
                            className="btn c-icon__btn p-message__text__modal__btn"
                            onClick={()=>{this.setState({
                                editNameState: false,
                                editEmailState: false,
                                rewrited: false
                            })}}
                        >
                            Sure
                        </button>
                    </Fragment>
                }
            </Fragment>
        )
    }
}
