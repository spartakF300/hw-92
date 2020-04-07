import React from 'react';
import {ButtonToggle, DropdownItem, DropdownMenu, DropdownToggle, NavItem, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterLink} from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const UserMenu = ({user,logout}) => {
    
    return (
        <>
        <UncontrolledDropdown className="text-dark ml-auto" nav inNavbar>
            <DropdownToggle className="text-dark "  nav caret>
                Hello, { user.lastName ? user.firstName :user.username}!
            </DropdownToggle>

            <DropdownMenu right>
                <DropdownItem>
                    <NavItem className="m-3" >
                        <ButtonToggle tag={RouterLink} to="/track_history" >Track history</ButtonToggle>{' '}
                    </NavItem>
                </DropdownItem>
                <DropdownItem>
                    <NavItem className="m-3" >
                        <ButtonToggle tag={RouterLink} to="/add_artist" >Add artist</ButtonToggle>{' '}
                    </NavItem>
                </DropdownItem>
                <DropdownItem>
                    <NavItem className="m-3" >
                        <ButtonToggle tag={RouterLink} to="/add_album" >Add album</ButtonToggle>{' '}
                    </NavItem>
                </DropdownItem>
                <DropdownItem>
                    <NavItem className="m-3" >
                        <ButtonToggle tag={RouterLink} to="/add_track" >Add track</ButtonToggle>{' '}
                    </NavItem>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                    Logout
                </DropdownItem>
            </DropdownMenu>

        </UncontrolledDropdown>
        <Avatar facebookId={user.facebookId} avatar={user.avatar} username={user.username}/>
    </>
    );
};
export default UserMenu;