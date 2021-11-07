import React, { Component, Fragment } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CloseIcon from '@mui/icons-material/Close';
// import Pagination from '@material-ui/lab/Pagination';
import Pagination from '@mui/material/Pagination';
import * as axiosHelper from '../helpers/axiosHelper';

class InitSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchWord: "",
            users: [],
            followed_users: [],
            following_users: [],
            mutually_follow_users_id: [],
            only_following_user_id: [],
            only_followed_user_id: [],
            distributied_users: [],
            specific_user_data: [],
            error_message: [],
            modalState: false,
            page: 1,
            currentPage: 1,
            totalPage: 0,
            usersPerPage: 10
        }
        this.onGetMutuallyUser = this.onGetMutuallyUser.bind(this);
        this.onGetFollowingUser = this.onGetFollowingUser.bind(this);
        this.onSearchUser = this.onSearchUser.bind(this);
        this.calculateUsersSituation = this.calculateUsersSituation.bind(this);
        this.onSearchUserClick = this.onSearchUserClick.bind(this);
        this.showFollowedUser = this.showFollowedUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onShowUserClick = this.onShowUserClick.bind(this);
        this.onFollowUserClick = this.onFollowUserClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.paginationChangeHandler = this.paginationChangeHandler.bind(this);
    }

    async onGetMutuallyUser() {
        try {
            const response = await axios(axiosHelper.getMutuallyUserConfig());
            const clean_array = response.data
            // TODO: 一般化して繰り返さない
            const caluculated_array = clean_array.flat();
            const caluculated_array_id = caluculated_array.map((object) => object.id);
            this.setState((state) => {
                state.mutually_follow_users_id = caluculated_array_id;
            }, () => {console.log('mutually_follow_users_id', this.state.mutually_follow_users_id)});
        } catch(error){
            console.log(error.response.data);
        }
    }
    async onGetFollowingUser() {
        try {
            const response = await axios(axiosHelper.getFollowingUserConfig());
            const clean_array = response.data
            // TODO: 一般化して繰り返さない
            const caluculated_array = clean_array.flat();
            this.setState((state) => {
                const mutually_follow_users_id = state.mutually_follow_users_id
                if(mutually_follow_users_id !== [] && caluculated_array.findIndex(({id}) => id === mutually_follow_users_id[0]) !== -1) {
                    for(var i = 0; i < mutually_follow_users_id.length; i++){
                        const targetIndex = caluculated_array.findIndex(({id}) => id === mutually_follow_users_id[i]);
                        caluculated_array.splice(targetIndex, 1);
                    }
                    return state.following_users = caluculated_array;
                } else {
                    return state.following_users = caluculated_array;
                }
            }, () => {});

            console.log('only_following_user_id', this.state.following_users);
        } catch(error){
            console.log(error.response.data);
        }
    }
    // about show followed user
    async showFollowedUser() {
        try {
            const response = await axios(axiosHelper.getFollowedUserConfig());
            const clean_array = response.data
            // TODO: 一般化して繰り返さない
            const caluculated_array = clean_array.flat();
            const caluculated_array_id = caluculated_array.map((object) => object.id);
            console.log('followed_users', caluculated_array_id);
            this.setState((state) => {
                const mutually_follow_users_id = state.mutually_follow_users_id
                if(mutually_follow_users_id !== [] && caluculated_array.findIndex(({id}) => id === mutually_follow_users_id[0]) !== -1) {
                    for(var i = 0; i < mutually_follow_users_id.length; i++){
                        const targetIndex = caluculated_array.findIndex(({id}) => id === mutually_follow_users_id[i]);
                        caluculated_array.splice(targetIndex, 1);
                    }
                    return state.followed_users = caluculated_array;
                } else {
                    return state.followed_users = caluculated_array;
                }
            }, () => {});
            console.log('only_followed_users', this.state.followed_users);
        } catch(error){
            console.log(error.response.data);
        }
    };

    // about show users
    async onSearchUser(search_word) {
        try {
          const response = await axios(axiosHelper.getUsers(search_word));
          const search_user = response.data;
        //   this.setState({users: response.data})
          const folowing_response = await axios(axiosHelper.getFollowingUserConfig());
          const clean_array = folowing_response.data
          const caluculated_array = clean_array.flat();
          this.calculateUsersSituation(caluculated_array, search_user);
        } catch(error){
          console.log(error.response.data);
        }
    }
    calculateUsersSituation(caluculated_array, search_user) {
        this.setState(state => {
            const calculating_users = search_user;
            const caluculated_array_id = caluculated_array.map((object) => object.id);
            if(caluculated_array_id !== [] && calculating_users.findIndex(({id}) => id === caluculated_array_id[0]) !== -1) {
                for(var i = 0; i < caluculated_array_id.length; i++){
                    const targetIndex = calculating_users.findIndex(({id}) => id === caluculated_array_id[i]);
                    calculating_users.splice(targetIndex, 1);
                }
                return state.distributied_users = calculating_users;
            } else {
                return state.distributied_users = search_user;
            }
        }, () => {});

    }
    onSearchUserClick(e) {
        this.setState({page: 1})
        this.setState({currentPage: 1});
        const search_word = this.state.searchWord
        e.preventDefault();
        this.onSearchUser(search_word);
    }
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
        this.setState({modalState: true});
    }
    async onFollowUser(only_following_user_id) {
        try {
          const response = await axios(axiosHelper.postFollowUserConfig(only_following_user_id));
          this.setState({specific_user_data: response.data})
        } catch(error){
          this.setState({error_message: error.response.data.message});
        }
    }
    onFollowUserClick(event) {
        const only_following_user_id = this.state.specific_user_data.id;
        event.preventDefault();
        this.onFollowUser(only_following_user_id);
        this.setState({modalState: false});
    }
    onCloseClick() {
        this.setState({specific_user_data: []});
        this.setState({error_message: []});
        this.setState({modalState: false});
    }
    handleChange(e) {
        this.setState({[e.target.name] : e.target.value });
    }
    componentDidMount() {
        this.onGetMutuallyUser();
        this.onGetFollowingUser();
        this.showFollowedUser();
        this.onSearchUser(this.state.searchWord);
    }

    paginationChangeHandler(event, value) {
        this.setState((state) => {
            state.page = value;
        },
        () => {
            this.setState({currentPage: this.state.page});
        });
    }

    render() {
            const indexOfLastUsers = this.state.currentPage * this.state.usersPerPage;
            const indexOfFirstUsers = indexOfLastUsers - this.state.usersPerPage;
            const currentUsers = this.state.distributied_users.slice(indexOfFirstUsers, indexOfLastUsers);
            const pageNumbers = [];
            for(let i = 1; i <= Math.ceil(this.state.distributied_users.length / this.state.usersPerPage); i++) { pageNumbers.push(i); }

        return (
            <Fragment>
                <div className="p-search">
                    <div className="p-search__detail">
                        { this.state.modalState == true &&
                            <Fragment>
                                <div className="p-search__detail__user">{this.state.specific_user_data.name}</div>
                                <button
                                    id={this.state.specific_user_data.id}
                                    className="btn c-icon__btn p-search__detail__btn"
                                    onClick={this.onFollowUserClick}
                                >
                                    <EmojiPeopleIcon />
                                </button>
                                <button
                                    className="btn c-icon__btn p-search__detail__btn"
                                >
                                    <CloseIcon onClick={this.onCloseClick}/>
                                    </button>
                            </Fragment>
                        }
                    </div>
                    <div className="p-search__attention">
                        {this.state.error_message && <p>{this.state.error_message}</p>}
                    </div>
                    <div className="p-search__container">
                        <div className="p-search__followed">
                                <div className="p-search__followed__title">あなたの承認を待っている人</div>
                            {this.state.followed_users.map((followed_user) =>
                                <Fragment key={followed_user.id}>
                                    <div className="p-search__followed__item" value={followed_user.id}>
                                        {followed_user.name}
                                        <button
                                            id={followed_user.id}
                                            className="btn c-icon__btn"
                                            onClick={this.onShowUserClick}
                                        >
                                            <ContactsIcon />
                                        </button>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                        <div className="p-search__following">
                            <div className="p-search__following__title">まだ承認してくれていない人</div>
                            {this.state.following_users.map((following_user) =>
                                <Fragment key={following_user.id}>
                                    <div className="p-search__following__item" value={following_user.id}>
                                        {following_user.name}
                                    </div>
                                </Fragment>
                            )}
                        </div>
                        <div className="p-search__block">
                            <div className='p-search__bar'>
                                <input
                                    className="p-search__bar__input"
                                    placeholder="Search"
                                    name="searchWord"
                                    value={this.state.searchWord || ""}
                                    onChange={this.handleChange}
                                />
                                <button
                                    className="btn btn-secondary p-search__bar__btn"
                                    onClick={this.onSearchUserClick}
                                >
                                    <SearchIcon />
                                    Search
                                </button>
                            </div>
                            <div className="p-search__list">
                                {currentUsers.map((user) =>
                                    <Fragment key={user.id}>
                                        <div className="p-search__list__item" value={user.id}>
                                            {user.name}
                                            <button
                                                id={user.id}
                                                className="btn c-icon__btn"
                                                onClick={this.onShowUserClick}
                                            >
                                                <ContactsIcon />
                                            </button>
                                        </div>
                                    </Fragment>
                                )}
                                { this.state.distributied_users.length > 10
                                    && <Pagination
                                        className="p-search__list__pagination"
                                        count={pageNumbers.length}size="small"
                                        hidePrevButton
                                        hideNextButton
                                        page={this.state.page}
                                        onChange={this.paginationChangeHandler}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

 export default InitSearch;
