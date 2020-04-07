import {push} from "connected-react-router";

import axiosApi from "../../axiosApi";

export const FETCH_TRACK_HISTORY_REQUEST = 'FETCH_TRACK_HISTORY_REQUEST';
export const FETCH_TRACK_HISTORY_SUCCESS = 'FETCH_TRACK_HISTORY_SUCCESS';
export const FETCH_TRACK_HISTORY_FAILURE = 'FETCH_TRACK_HISTORY_FAILURE';

export const fetchTrackHistoryRequest = () => {
    return {type: FETCH_TRACK_HISTORY_REQUEST}
};
export const fetchTrackHistorySuccess = (data) => {
    return {type: FETCH_TRACK_HISTORY_SUCCESS, data}
};
export const fetchTrackHistoryFailure = error => {
    return {type: FETCH_TRACK_HISTORY_FAILURE, error}
};

export const addTrackHistory = (id) => {

    return async (dispatch, getState) => {
        const user = getState().users.user;
        if (!user) return dispatch(push('/login'));
        try {
            dispatch(fetchTrackHistoryRequest());
            await axiosApi.post('/track_history', {track: id},{headers: {'Authorization':'Token '+ user.token}});

            console.log('request')
        } catch (e) {
            dispatch(fetchTrackHistoryFailure(e));
        }
    }
};
export const getTrackHistory = () => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        if (!user) return dispatch(push('/login'));
        try {
            dispatch(fetchTrackHistoryRequest());
         const response =   await axiosApi.get('/track_history', {headers: {'Authorization':'Token '+ user.token}});
         dispatch(fetchTrackHistorySuccess(response.data));
        } catch (e) {
            dispatch(fetchTrackHistoryFailure(e));
        }
    }
};