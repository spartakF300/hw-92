import React from 'react';
import {NavItem, NavLink} from "reactstrap";
import {NavLink as RouterLink} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <NavItem className="ml-auto">
                <NavLink className="text-dark"  tag={RouterLink} to="/register" exact>Register</NavLink>
            </NavItem>
            <NavItem  >
                <NavLink className="text-dark" tag={RouterLink} to="/login" exact>Login</NavLink>
            </NavItem>
        </>
    );
};

export default AnonymousMenu;