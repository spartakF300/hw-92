import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteArtist, getArtists, publish} from "../../store/actions/actionsArtists";
import {Col, Row} from "reactstrap";
import './MainPage.css'
import Element from "../../Componets/Elment/Element";


class MainPage extends Component {
    componentDidMount() {
        this.props.getArtists()
    }
    render() {
        return (
            <>
                <Row xs="2">
                    <Col sm="8">
                <h1 style={{margin: '20px'}}>Artist</h1>
                <div className="artist">
                    {this.props.artists && this.props.artists.map(artist => {
                        return <Element
                        key={artist._id}
                        title={artist.name}
                        image={artist.image}
                        isPublished={artist.isPublished}
                        pathRoute={`/albums/${artist._id}`}
                        user={this.props.user}
                        remove={() => this.props.deleteArtist(artist._id)}
                        publish={() => this.props.publish(artist._id)}

                        />

                    })}
                </div>
                    </Col>
                </Row>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {

        artists: state.artists.artists,
        user: state.users.user,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getArtists:()=> dispatch(getArtists()),
        deleteArtist: (id) => dispatch(deleteArtist(id)),
        publish:(id)=>  dispatch(publish(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);