import {
    FETCH_ALBUM_SUCCESS,
    FETCH_ALBUMS_ERROR,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS, FETCH_ALBUMS_SUCCESS_ALL
} from "../actions/actionsAlbums";

const initialState = {
    albums:[],
    albumsAll:[],
    loading: false,
    error: null
};
const albumsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case FETCH_ALBUMS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_ALBUM_SUCCESS:
            return {...state,loading:false};
        case FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.data,
                loading: false
            };
        case FETCH_ALBUMS_SUCCESS_ALL:
            return {...state,albumsAll:action.data,loading: false}
        case FETCH_ALBUMS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };


        default:
            return state
    }
};
export default  albumsReducer;