import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar() {
    return (
        <div className="search">
            <div className='search__bar'>
                <SearchIcon />
                <input
                    className="search__bar__input"
                    placeholder="Search"
                />
            </div>
        </div>
      )
 }

 export default SearchBar;
