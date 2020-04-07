import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteTrack, getTracks, publishTrack} from "../../store/actions/actionsTracks";
import {Button, CardFooter} from "reactstrap";
import {addTrackHistory} from "../../store/actions/actionsTrackHistory";


class Tracks extends Component {
    componentDidMount() {
        this.props.getTracks(this.props.match.params.id);
    }

    query = (param) => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const item = params.get(param);
        return item
    };

    render() {
        return (
            <div>
                {this.props.tracks[0] && <div style={{margin: '5px auto 5px 10px', textAlign: 'initial'}}>
                    <h1>Имя артиста: {this.query('artist')}</h1>
                    <h2>Название альбома: {this.query('album')}</h2>
                </div>}

                {this.props.tracks && this.props.tracks.map(item => {

                    return <div className="track" key={item._id}>
                        <h3>№{item.number}</h3>
                        <h4>Название трэка: {item.title}</h4>
                        <p> Продолжительность: {item.duration}</p>
                        {
                            this.props.user && <Button
                                onClick={() => this.props.addTrackHistory(item._id)}
                            >
                                Add history
                            </Button>}
                        {this.props.user && this.props.user.role === 'admin'
                            ? <CardFooter className="d-flex justify-content-between">
                            {item.isPublished
                                ? <Button size="sm" color="secondary"
                                          onClick={()=>this.props.publish({id:item._id,albumId:this.props.match.params.id})}>
                                    Unpublish
                            </Button>
                                : <Button
                                    size="sm"
                                    color="success"
                                    onClick={()=>this.props.publish({id:item._id,albumId:this.props.match.params.id})}
                                >
                                    Publish
                                </Button>
                            }
                            <Button
                                size="sm"
                                color="danger"
                                onClick={()=>this.props.deleteTrack({id:item._id,albumId:this.props.match.params.id})}
                            >
                                Delete
                            </Button>
                            </CardFooter>
                            : null
                        }

                    </div>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tracks: state.tracks.tracks,
        user: state.users.user

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTracks: (data) => dispatch(getTracks(data)),
        addTrackHistory: (data) => dispatch(addTrackHistory(data)),
        deleteTrack:(data)=>dispatch(deleteTrack(data)),
        publish:(data)=>dispatch(publishTrack(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Tracks);

