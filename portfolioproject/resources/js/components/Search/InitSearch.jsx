import React, { Component, Fragment } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import * as axiosHelper from '../helpers/axiosHelper';


class InitSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchWord: "",
            users: []
        }
        this.onSearchUser = this.onSearchUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSearchUserClick = this.onSearchUserClick.bind(this);
    }

    async onSearchUser(search_word) {
        try {
          const response = await axios(axiosHelper.getUsers(search_word));
          this.setState({users: response.data})
          console.log(response.data);
        } catch(error){
          console.log(error.response.data);
          // this.setState({ errors: [error.response.data.message]});
        }
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value });
    }

    onSearchUserClick(e) {
        const search_word = this.state.searchWord
        e.preventDefault();
        this.onSearchUser(search_word);
    }

    componentDidMount() {
        this.onSearchUser(this.state.searchWord);
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
                    <div className="c-search__user-list">
                        <div className="user-list">
                            {this.state.users.map((user) =>
                                <div className="user-list__item" key={user.id} value={user.id}>{user.name}</div>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

 export default InitSearch;
