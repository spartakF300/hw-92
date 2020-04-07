import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteAlbum, getAlbums, publishAlbum} from "../../store/actions/actionsAlbums";
import './Albums.css'
import Element from "../../Componets/Elment/Element";

class Albums extends Component {
   async componentDidMount() {
       await this.props.getAlbums(this.props.match.params.id);
    }
    render() {

    return this.props.albums &&  (
        <>
            <h1 style={{margin: '20px'}}>Albums</h1>
            <div className="album-container">

                {this.props.albums && this.props.albums.map(albums => {

                    return<div className="d-flex flex-column align-items-center" key={albums._id}>
                        <h2>Год:{albums.year}</h2>
                        <Element

                            title={albums.title}
                            image={albums.image}
                            isPublished={albums.isPublished}
                            pathRoute={`/tracks/${albums._id}?album=${albums.title}&artist=${albums.artist.name}`}
                            user={this.props.user}
                            remove={() => this.props.deleteAlbum({id:albums._id,artistId:this.props.match.params.id})}
                            publish={() => this.props.publish({id:albums._id,artistId:this.props.match.params.id})}
                        />
                    </div>
                })}

            </div>
        </>
    );

}


};
const mapStateToProps = (state) => {
    return {
        albums: state.albums.albums,
        user: state.users.user

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAlbums: (data) => dispatch(getAlbums(data)),
        deleteAlbum: (id) => dispatch(deleteAlbum(id)),
        publish: (id) => dispatch(publishAlbum(id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Albums);