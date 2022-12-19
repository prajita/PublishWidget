import React from 'react';
import '../style.css';

export const  SearchSectionComponent = props => {
    return (
            <input value={props.value} className="search-section" placeholder="search widget..." onChange={e=> props.updateSearchString(e.target.value)}></input>
    )
}