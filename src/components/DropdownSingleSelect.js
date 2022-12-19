import React from 'react';
import Select from 'react-select';
 
const DropdownSingleSelect = props => {

      const {options, isMulti = false, disabled = false, isClearable = true, menuHeight, update, placeholder, value} = props;
      const displayVal = {"label": value, "value": value}
      return <Select 
        placeholder= {placeholder}
        options={options} 
        isClearable={isClearable}
        disabled = {disabled}
        isMulti = {isMulti} 
        maxMenuHeight={menuHeight}
        defaultValue= {""}
        value={displayVal}
        onChange={(data) => update(data ? data.value: "")}
      />
}
    
export default DropdownSingleSelect;