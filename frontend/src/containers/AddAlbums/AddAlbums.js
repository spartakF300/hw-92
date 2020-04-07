import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Row} from "reactstrap";
import FormElement from "../../Componets/FormElement/FormElement";
import {connect} from "react-redux";
import {getArtists} from "../../store/actions/actionsArtists";
import {postAlbums} from "../../store/actions/actionsAlbums";

class AddAlbums extends Component {


    state = {
        title: '',
        image: null,
        year:'',
        artist:''
    };
    componentDidMount() {
        this.props.getArtists()
    }

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
        this.props.postAlbums(formData);
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
                            <h2>Add new album</h2>
                            <FormElement
                                type="text"
                                propertyName="title"
                                title="Title"
                                value={this.state.title}
                                onChange={this.inputChangeHandler}
                            />
                            <FormElement
                                type="text"
                                propertyName="year"
                                title="Year"
                                value={this.state.year}
                                onChange={this.inputChangeHandler}
                                autoComplete="current-year"
                                placeholder="Enter year"
                            />
                            <FormElement
                                type="select"
                                propertyName="artist" required
                                title="Artist"
                                value={this.state.artist}
                                onChange={this.inputChangeHandler}
                                autoComplete="current-artist"
                                placeholder="Enter artist"
                                options={this.props.artists.map(a =>({id:a._id,title:a.name}))}
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
                                        Add album
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
const mapStateToProps = state=>({
   artists:state.artists.artists
});
const mapDispatchToProps = dispatch =>{
    return {
       getArtists:()=> dispatch(getArtists()),
        postAlbums: (data)=> dispatch(postAlbums(data))
    }
};
export default connect(mapStateToProps,mapDispatchToProps) (AddAlbums);