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
            editState: false,
            blankNewNameAlart: false,
            rewriedName: false,
            rewriedEmail: false
        }
        this.showProfileClicked = this.showProfileClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editProfileSubmit = this.editProfileSubmit.bind(this);
        this.newNameSubmited = this.newNameSubmited.bind(this);
    }

    async showProfileClicked(){
        try {
            const { data } = await axios(axiosHelper.getProfile());
            this.setState({ currentUserProfile: data });
        } catch(error) {
            errorCallback( error && error.response.data || {error: "Unprocessable entity"});
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

    handleChange(e) {
    // handleChangeNewName(e) {
        e.preventDefault();
        // this.setState({ newName: e.target.value })
        this.setState({ [e.target.name]: e.target.value });
    }

    editProfileSubmit(e) {
        if(this.state.newName == "") {
            return null;
        } else {
            const new_name = this.state.newName;
            this.newNameSubmited(new_name);
            this.setState({newName: "", editState: false});
            this.showProfileClicked();
            this.setState({rewriedName: true});
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
                {this.state.editState == false &&
                    <button
                        className="btn c-icon__btn" onClick={()=>{this.setState({editState: true})}}
                    >
                        Edit the profile.
                    </button>
                }
                <div>{this.state.currentUserProfile.name}</div>
                {this.state.editState == true &&
                    <Fragment>
                        <TextField
                            id="standard-basic"
                            className="p-message__text__block__field"
                            label="New Name"
                            value={this.state.newName || ""}
                            onChange={this.handleChange}
                            name="newName"
                        />
                        {this.state.newName !== "" &&
                            <button
                                className="btn c-icon__btn p-message__text__modal__btn"
                                onClick={this.editProfileSubmit}
                            >
                                Submit
                            </button>
                        }
                    </Fragment>
                }
                {this.state.rewriedName == true &&
                    <Fragment>
                        <p>名前が変更されました</p>
                        <button
                            className="btn c-icon__btn p-message__text__modal__btn"
                            onClick={()=>{this.setState({editState: false, rewriedName: false})}}
                        >
                            Sure
                        </button>
                    </Fragment>
                }


            </Fragment>
        )
    }
}
