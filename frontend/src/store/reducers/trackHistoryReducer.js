import {
    FETCH_TRACK_HISTORY_FAILURE,
    FETCH_TRACK_HISTORY_REQUEST,
    FETCH_TRACK_HISTORY_SUCCESS
} from "../actions/actionsTrackHistory";

const initialState = {
    trackHistory:[],
    loading: false,
    error: null
};
const trackHistory = (state = initialState, action)=>{
    switch (action.type) {
        case FETCH_TRACK_HISTORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_TRACK_HISTORY_SUCCESS:
            return {
                ...state,
                trackHistory: action.data,
                loading: false
            };
        case FETCH_TRACK_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };


        default:
            return state
    }
};
export default  trackHistory;