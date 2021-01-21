import React, { useState } from 'react'
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { 
    FILTER__ALL, 
    FILTER__DAY, 
    FILTER__WEEK, 
    FILTER__MONTH 
} from '../constants/Filter';

interface IProps {
    setFilterValue: (filterValue: string) => void;
}
/**
 *Button used for filtering options
 *
 * @param {IProps} {setFilterValue}
 * @return {*} 
 */
const Filter = ({setFilterValue}: IProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <ButtonDropdown isOpen={isDropdownOpen} toggle={() => setIsDropdownOpen(!isDropdownOpen)} style={{marginBottom:10}}>
        <DropdownToggle caret>Filter Data By</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={()=>{setFilterValue(FILTER__ALL.value)}}>{FILTER__ALL.label}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={()=>{setFilterValue(FILTER__DAY.value)}}>{FILTER__DAY.label}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={()=>{setFilterValue(FILTER__WEEK.value)}}>{FILTER__WEEK.label}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={()=>{setFilterValue(FILTER__MONTH.value)}}>{FILTER__MONTH.label}</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    )
}

export default Filter
