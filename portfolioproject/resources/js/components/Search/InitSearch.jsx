import React, { Component, Fragment } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import * as axiosHelper from '../helpers/axiosHelper';


class InitSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchWord: "",
            users: [],
            following_user_id: [2, 14],
            distributied_users: [],
            specific_user_data: []
        }
        this.onSearchUser = this.onSearchUser.bind(this);
        this.calculateUsersSituation = this.calculateUsersSituation.bind(this);
        this.onSearchUserClick = this.onSearchUserClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onShowUserClick = this.onShowUserClick.bind(this);
    }


    // about show users
    async onSearchUser(search_word) {
        try {
          const response = await axios(axiosHelper.getUsers(search_word));
          this.setState({users: response.data})
          this.calculateUsersSituation();
        } catch(error){
          console.log(error.response.data);
        }
    }
    calculateUsersSituation() {
        this.setState(state => {
            const following_user_id = this.state.following_user_id;
            const calculating_users = state.users;
            if(following_user_id !== [] && calculating_users.findIndex(({id}) => id === following_user_id[0]) !== -1) {
                for(var i = 0; i < following_user_id.length; i++){
                    const targetIndex = calculating_users.findIndex(({id}) => id === following_user_id[i]);
                    calculating_users.splice(targetIndex, 1);
                }
                return state.distributied_users = calculating_users;
            }
        }, () => {});
    }
    onSearchUserClick(e) {
        const search_word = this.state.searchWord
        e.preventDefault();
        this.onSearchUser(search_word);
    }


    // about show specific user
    async onShowUser(user_id) {
        try {
          const response = await axios(axiosHelper.getUserDetail(user_id));
          this.setState({specific_user_data: response.data})
        } catch(error){
          console.log(error.response.data);
        }
    }
    onShowUserClick(event) {
        const user_id = event.currentTarget.id;
        event.preventDefault();
        this.onShowUser(user_id);
    }


    componentDidMount() {
        this.onSearchUser(this.state.searchWord);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value });
    }



    render() {
        return (
            <Fragment>
                <div className="c-search">
                    <div className='c-search__bar'>
                        <input
                            className="c-search__bar__input"
                            placeholder="Search"
                            name="searchWord"
                            value={this.state.searchWord || ""}
                            onChange={this.handleChange}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={this.onSearchUserClick}
                        >
                            <SearchIcon />
                            Search
                        </button>
                    </div>

                    <div className="c-search__detail">
                        { this.state.specific_user_data &&
                            <Fragment>
                                <div>{this.state.specific_user_data.name}</div>
                            </Fragment>
                        }
                    </div>

                    <div className="c-search__list">
                        <div className="user-list">
                            {this.state.users.map((user) =>
                                <Fragment key={user.id}>
                                    <div className="user-list__item" value={user.id}>
                                        {user.name}
                                        <button
                                            id={user.id}
                                            className="btn c-icon__btn"
                                            onClick={this.onShowUserClick}
                                        >
                                            <EmojiPeopleIcon />
                                        </button>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

 export default InitSearch;
