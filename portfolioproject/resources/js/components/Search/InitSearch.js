import React, { Component, Fragment } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import UserList from './UserList';
// import MenuItem from '@material-ui/core/MenuItem';


class InitSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSearchUser = this.onSearchUser.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value });
    }

    onSearchUser() {
        const search_word = this.state.searchName
        e.preventDefault();

    }

    render() {
        return (
            <Fragment>
                <div className="c-search">
                    <div className='c-search__bar'>
                        <input
                            className="c-search__bar__input"
                            placeholder="Search"
                            name="searchName"
                            value={this.state.searchName || ""}
                            onChange={this.handleChange}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={this.onSearchUser}
                        >
                            <SearchIcon />
                            Search
                        </button>
                    </div>
                    <div className="c-search__user-list">
                        <UserList />
                    </div>
                </div>
            </Fragment>
        )
    }
}

 export default InitSearch;
