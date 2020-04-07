import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const REQUEST_START_ARTIST = 'REQUEST_START_ARTIST';
export const FETCH_ARTIST_SUCCESS = 'REQUEST_ARTIST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_END = 'REQUEST_END';


export const FETCH_ARTIST_POST_SUCCESS ='FETCH_ARTIST_POST_SUCCESS';


export const fetchArtistPostSuccess = ()=>{
    return{type:FETCH_ARTIST_POST_SUCCESS}
};
export const fetchArtistsSuccess = (data) => {
    return {type: FETCH_ARTIST_SUCCESS, data}
};
export const request = () => {
    return {type: REQUEST_START_ARTIST}
};
export const requestEnd = () => {
    return {type: REQUEST_END}
};

export const errorRequest = (err) => {
    return {type: REQUEST_ERROR, err}
};

export const getArtists = () => {
    return async (dispatch) => {
        try {
            dispatch(request());
            const response = await axiosApi.get('/artists');
            dispatch(fetchArtistsSuccess(response.data))
        } catch (e) {
            dispatch(errorRequest(e))
        }

    }
};


export const postArtist = (data) => {
    return async (dispatch) => {
        try {
            dispatch(request());
             await axiosApi.post('/artists', data);
            dispatch(fetchArtistPostSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(errorRequest(e))
        }

    }
};

export const deleteArtist = id => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`/artists/${id}`);
            dispatch(getArtists());
        } catch (e) {
            console.log(e);
        }
    }
};
export const publish = id => {
    return async (dispatch) => {
        try {
            await axiosApi.post(`/artists/${id}/publish`);
            dispatch(getArtists());
        } catch (e) {
            console.log(e);
        }
    }
};