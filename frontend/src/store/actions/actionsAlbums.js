import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router'

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_ERROR = 'FETCH_ALBUMS_ERROR';


export const FETCH_ALBUMS_SUCCESS_ALL = 'FETCH_ALBUMS_SUCCESS_ALL';


export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';

export const fetchAlbumsAll =(data)=>({type:FETCH_ALBUMS_SUCCESS_ALL,data});
export const fetchPostSuccess = ()=>({type:FETCH_ALBUM_SUCCESS});
export const fetchAlbumsSuccess = data => ({type: FETCH_ALBUMS_SUCCESS, data});
export const fetchErrorRequest = error => ({type: FETCH_ALBUMS_ERROR});
export const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});


export const getAlbums = (artistId) => {

    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());
            const response = await axiosApi.get('/albums?artist=' + artistId);
            dispatch(fetchAlbumsSuccess(response.data))
        } catch (e) {
            dispatch(fetchErrorRequest(e))
        }


    }
};
export const getAlbumsAll = () => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());
            const response = await axiosApi.get('/albums' );
            dispatch(fetchAlbumsAll(response.data))
        } catch (e) {
            dispatch(fetchErrorRequest(e))
        }


    }
};

export const postAlbums = (data) => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());
            await axiosApi.post('/albums', data);
            dispatch(fetchPostSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(fetchErrorRequest(e))
        }


    }
};

export const deleteAlbum = data => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`/albums/${data.id}`);
            dispatch(getAlbums(data.artistId));
        } catch (e) {
            console.log(e);
        }
    }
};
export const publishAlbum = data => {
    return async (dispatch) => {
        try {
            await axiosApi.post(`/albums/${data.id}/publish`);
            dispatch(getAlbums(data.artistId));
        } catch (e) {
            console.log(e);
        }
    }
};