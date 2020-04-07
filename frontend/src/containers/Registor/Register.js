import React, {Component} from 'react';
import FormElement from "../../Componets/FormElement/FormElement";
import {Button, Col, Form, FormGroup} from "reactstrap";
import {connect} from "react-redux";
import {registerUser} from "../../store/actions/actionsUsers";

class Register extends Component {
    state = {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        avatar: null
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key])
        });

        this.props.registerUser(formData);
    };
    getFieldError = fieldName => {
        try {
            return this.state.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };
    fileChangeHandler = (e) => {
        this.setState({avatar: e.target.files[0]})
    };

    render() {
        return (
            <>
                <Form onSubmit={this.submitFormHandler}>
                    <h2>Register new user</h2>
                    <FormElement
                        error={this.getFieldError('username')}
                        type="text" required
                        propertyName="username"
                        title="Username"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        autoComplete="current-username"
                        placeholder="Enter username you registered with"
                    />
                    <FormElement
                        error={this.getFieldError('firstName')}
                        type="text" required
                        propertyName="firstName"
                        title="FirstName"
                        value={this.state.firstName}
                        onChange={this.inputChangeHandler}
                        autoComplete="current-firstName"
                        placeholder="Enter firstName you registered with"
                    />
                    <FormElement
                        error={this.getFieldError('lastName')}
                        type="text" required
                        propertyName="lastName"
                        title="LastName"
                        value={this.state.lastName}
                        onChange={this.inputChangeHandler}
                        autoComplete="current-lastName"
                        placeholder="Enter lastName you registered with"
                    />
                    <FormElement
                        error={this.getFieldError('password')}
                        type="password" required
                        propertyName="password"
                        title="Password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        autoComplete="current-password"
                        placeholder="Enter password"
                    />
                    <FormElement
                        error={this.getFieldError('avatar')}
                        type="file"
                        propertyName="avatar"
                        title="Avatar"
                        onChange={this.fileChangeHandler}
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});
const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);