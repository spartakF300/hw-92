import React from 'react';
import {url} from "../../constants";


const Avatar = (props) => {
    let avatar;
    if (props.facebookId){
        avatar = props.avatar
    }else{
        avatar = url +'/'+ props.avatar;
    }
    if (!props.avatar){
        return null
    }
    return (
        <div className="wrap-avatar">
            <img className="avatar" src={avatar} alt={props.username}/>
        </div>
    );
};

export default Avatar;