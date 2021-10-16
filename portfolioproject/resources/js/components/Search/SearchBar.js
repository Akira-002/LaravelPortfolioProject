import React, { Component, Fragment } from 'react';
import SearchIcon from '@material-ui/icons/Search';
// import MenuItem from '@material-ui/core/MenuItem';


class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value });
    }

    render() {
        return (
            <Fragment>
                <div className="search">


                    {/* <div>
                        {this.props.users.map((user) =>
                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                        )}
                    </div> */}

                    <div className='search__bar'>
                        <SearchIcon />
                        <input
                            className="search__bar__input"
                            placeholder="Search"
                            name="searchName"
                            value={this.state.searchName || ""}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

 export default SearchBar;
