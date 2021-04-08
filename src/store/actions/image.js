import axios from '../../axios-order';
import * as actionTypes from './actionsType';

export const fetchImageStart = () => {
    return {
        type: actionTypes.FETCH_IMAGE_START
    };
};

export const fetchImageSuccess = (images) => {
    
    return {
        type: actionTypes.FETCH_IMAGE_SUCCESS,
        images:images
    };
};

export const fetchImageFail = (error) => {
    return {
        type: actionTypes.FETCH_IMAGE_FAIL,
        error: error
    };
};


export const fetchImage = (id,payload) => {
    return dispatch => {
        dispatch(fetchImageStart());
        axios.post('/registerWithFaces/'+id, payload)
        .then( (res)=> {
        const photos =[];
        for (let key in res.data.images) {
        photos.push({
        id: key,
        ...res.data.images[key]
        });
        }
    dispatch(fetchImageSuccess(photos));
    })
    .catch( (error)=> {console.log(error); dispatch(fetchImageFail(error));});};
};
