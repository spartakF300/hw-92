import React, {Component} from "react";
import {Button, Col, Form, FormGroup, Row} from "reactstrap";
import FormElement from "../../Componets/FormElement/FormElement";
import {getAlbumsAll} from "../../store/actions/actionsAlbums";
import {connect} from "react-redux";
import {postTracks} from "../../store/actions/actionsTracks";

class AddTrack extends Component {
    state = {
        title: '',
        duration: '',
       album:''
    };


    componentDidMount() {
        this.props.getAlbumsAll()
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    submitFormHandler = event => {
        event.preventDefault();

        this.props.postTracks({...this.state});
    };


    render() {
        return (
            <>
                <Row>
                    <Col className="offset-sm-3"  xs="8">
                        <Form onSubmit={this.submitFormHandler}>
                            <h2>Add new track</h2>
                            <FormElement
                                type="text"
                                propertyName="title"
                                title="Title"
                                value={this.state.title}
                                onChange={this.inputChangeHandler}
                            />
                            <FormElement
                                type="text"
                                propertyName="duration"
                                title="Duration"
                                value={this.state.duration}
                                onChange={this.inputChangeHandler}
                                autoComplete="current-duration"
                                placeholder="Enter duration"
                            />
                            <FormElement
                                type="select"
                                propertyName="album" required
                                title="album"
                                value={this.state.album}
                                onChange={this.inputChangeHandler}
                                autoComplete="current-album"
                                placeholder="Enter album"
                                options={this.props.albumsAll.map(a =>({id:a._id,title:a.title}))}
                            />

                            <FormGroup row>
                                <Col sm={{offset:2, size: 10}}>
                                    <Button type="submit" color="primary">
                                        Add track
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
    albumsAll:state.albums.albumsAll
});
const mapDispatchToProps = dispatch =>{
    return {
        getAlbumsAll:()=> dispatch(getAlbumsAll()),
        postTracks: (data)=> dispatch(postTracks(data))
    }
};
export default connect(mapStateToProps,mapDispatchToProps) (AddTrack);