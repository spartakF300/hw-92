import React, {Component} from 'react';
import {getTrackHistory} from "../../store/actions/actionsTrackHistory";
import {connect} from "react-redux";
import './TrackHistory.css';
class TrackHistory extends Component {
    componentDidMount() {
        this.props.getTrackHistory()
    }

    render() {
        return (
            <div>
                {this.props.trackHistory && this.props.trackHistory.map((item)=>{
                   return <div className="track-history alert alert-success" key={item._id}>
                       <p>Трэк: {item.track.title}</p>
                       <p>Артист: {item.track.album.artist.name}</p>
                       <p>Дата: {new Date(item.datetime).toLocaleDateString('ru-RU') }</p>
                   </div>
                })}
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
       trackHistory: state.trackHistory.trackHistory
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getTrackHistory: () => dispatch(getTrackHistory()),
    }
};
export default connect(mapStateToProps,mapDispatchToProps) (TrackHistory);