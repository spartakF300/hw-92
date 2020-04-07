import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Row} from "reactstrap";
import FormElement from "../../Componets/FormElement/FormElement";
import {connect} from "react-redux";
import {postArtist} from "../../store/actions/actionsArtists";

class AddArtist extends Component {
    state = {
        name: '',
        image: null,
        info:''
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
            let value = this.state[key];
            formData.append(key, value);
        });
        this.props.addArtist(formData);
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    render() {
        return (
            <>
                <Row>
                    <Col className="offset-sm-3"  xs="8">
            <Form onSubmit={this.submitFormHandler}>
                <h2>Add new artist</h2>
                <FormElement
                    type="text"
                    propertyName="name"
                    title="Name"
                    value={this.state.name}
                    onChange={this.inputChangeHandler}
                />
                <FormElement
                    type="text"
                    propertyName="info"
                    title="Info"
                    value={this.state.info}
                    onChange={this.inputChangeHandler}
                    autoComplete="current-info"
                    placeholder="Enter info"
                />
                <FormElement
                    type="file"
                    propertyName="image"
                    title="Image"
                    onChange={this.fileChangeHandler}

                />

                <FormGroup row>
                    <Col sm={{offset:2, size: 10}}>
                        <Button type="submit" color="primary">
                            Add artist
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
                    </Col>
                </Row>
            </>
        );
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        addArtist: (data)=> dispatch(postArtist(data))
    }
};
export default connect(null,mapDispatchToProps) (AddArtist);