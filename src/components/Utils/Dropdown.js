import React, { useState } from "react";
import { Dropdown as ReactstrapDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const Dropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Blog 1');
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const onSelected = (selectedValue) => setSelectedItem(selectedValue)
  return (
    <ReactstrapDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret>
        {selectedItem}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => onSelected('Blog 1')}>Blog 1</DropdownItem>
        <DropdownItem onClick={() => onSelected('Blog 2')}>Blog 2</DropdownItem>
        <DropdownItem onClick={() => onSelected('Blog 3')}>Blog 3</DropdownItem>
      </DropdownMenu>
    </ReactstrapDropdown>
  )
};

export default Dropdown;