import React from 'react';
import Select from 'react-select';
 
const DropdownSingleSelect = props => {

      const {options, isMulti = false, disabled = false, isClearable = true, menuHeight, update, placeholder} = props;
      return <Select 
        placeholder= {placeholder}
        options={options} 
        isClearable={isClearable}
        disabled = {disabled}
        isMulti = {isMulti} 
        maxMenuHeight={menuHeight}
        defaultValue= {""}
        onChange={({value}) => update(value)}
      />
}
    
export default DropdownSingleSelect;