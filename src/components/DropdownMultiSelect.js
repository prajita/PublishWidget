import React from 'react';
import Select from 'react-select';
 
const DropdownMultiSelect = props => {

      const {options, disabled = false, isMulti , isClearable = true, menuHeight, update, placeholder, value} = props;
      return <Select 
        placeholder= {placeholder}
        options={options} 
        isClearable={isClearable}
        disabled = {disabled}
        maxMenuHeight={menuHeight}
        isMulti={isMulti}
        value={value}
        onChange={(data) => update(data)}
      />
}
    
export default DropdownMultiSelect;