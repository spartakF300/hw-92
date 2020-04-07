import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/actionsUsers";

const FaceBookLogin = () => {
    const dispatch = useDispatch();

    const callback = (data) => {

        if (data.id) {
            dispatch(loginWithFacebook(data))
        }
        console.log(data)
    };
    return (
        <FacebookLoginButton
            appId="643212349805713"
            callback={callback}
            fields = " name, picture "
            render={renderProps => (
                <Button
                    onClick={renderProps.onClick}
                >
                    Login with Facebook
                </Button>
            )}
        />
    );
};

export default FaceBookLogin;