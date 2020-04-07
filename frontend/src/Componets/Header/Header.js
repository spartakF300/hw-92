import React from 'react';
import {ButtonToggle, Nav, NavItem} from "reactstrap";
import {NavLink as RouterLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {logoutUser} from "../../store/actions/actionsUsers";

const Header = (props) => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch()
    return (
        <div>
            <Nav className="bg-primary" pills>
                <NavItem className="m-3" >
                    <ButtonToggle tag={RouterLink} to="/" >Main page</ButtonToggle>{' '}
                </NavItem>
                {user ?(
                    <UserMenu
                    user={user}
                    logout={() => dispatch(logoutUser())}
                    />
                ):(
                  <AnonymousMenu/>
                )}

            </Nav>
        </div>
    );
};
export default Header;