import React from 'react';
import '../style.css';
import DropdownMultiSelect from './DropdownMultiSelect';

const categoryOptions = [
    { label: "created", value: "created" },
    { label: "updated", value: "updated" },
    { label: "approved", value: "approved" },
    { label: "published", value: "published" },
    { label: "rejected", value: "rejected" }
    
  ];
export const  FilterSectionComponent = props => {
    return (
        <DropdownMultiSelect 
            options={categoryOptions} 
            menuHeight={160}
            isClearable
            isMulti
            value={props.value}
            placeholder={"Select options..."}
            update={data => props.updateFiltered(data)}
        />
    )
}