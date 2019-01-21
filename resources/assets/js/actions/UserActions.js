import api from '../api';
import {
    GET_CURRENT_USER,
    GET_USER_DETAIL,
    UPDATE_USER_DETAIL,
    GET_CURRENT_USER_DETAIL,
    UPDATE_RELATIONSHIP,
    GET_FRIENDS_YOU_LIKED,
    GET_FRIENDS_LIKED_YOU,
    GET_FRIENDS_VISITED,
    VERIFY_ID_CARD,
    GET_FEATURED_USER_PHOTOS,
    GET_PHOTOS_BY_TYPE,
    UPLOAD_FEATURED_PHOTOS,
    GET_USER_CONFIGURATIONS,
    UPDATE_USER_CONFIGURATIONS,
    UPDATE_PASSWORD,
    GET_ID_CARD_VERIFY
} from './types';
import {cleanObject} from '../helper/function';

export const logout = () => dispatch => {
    api.get(`/logout`).then(response => {
        console.log(response);
        window.location.href = `${baseUrl}/login`;
    }).catch(err => {
        console.log(err);
    })
}

export const getCurrentUser = () => (dispatch) => {
    api.get('user')
    .then(response => {
        const user = response.data;
        // tinh muc do hoan thien profile
        var arr_1 = ["name", 'email', 'birthday', 'gender', 'marital_status', 'address', 'job', 'education', 'ethnicity', 'religion', 'mobile', 'province_id', 'district_id', 'village_id'];
        var arr_2 = ['weight', 'height', 'hobbies', 'lifestyle'];

        var temp = 0;
        Object.keys(user).map(key => {
            if(user[key]) {
                if(arr_1.indexOf(key) >= 0) temp += 5;
                else if(arr_2.indexOf(key) >= 0) temp += 2;
            }
        })
        
        var percentage = temp/(arr_1.length * 5 + arr_2.length * 2)*100;
        localStorage.setItem('percentage', percentage);

        dispatch({type: GET_CURRENT_USER, payload: response.data});
    })
    .catch(error => {
        console.log(error);
    })
}

export const getOtherUserDetail = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api.get(`/user/${id}`)
            .then(response => {
                if(!response.data.relationship) {
                    response.data.relationship = {}
                }

                dispatch({type: GET_USER_DETAIL, payload: response.data});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
    });
    
}

export const getCurrentUserDetail = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api.get('/user')
        .then(response => {
            resolve(response.data);
            dispatch({type: GET_CURRENT_USER_DETAIL, payload: response.data});
        })
        .catch(err => {
            reject(err);
            console.log(err);
        })
    })
}

export const updateUser = (data, id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        return api.post(`/user/${id}`, data)
        .then(response => {
            dispatch({type: UPDATE_USER_DETAIL, payload: response.data});
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    })
}

export const updateRelationship = (data, user_id) => (dispatch) => {
    api.post(`/relationship/${user_id}`, data)
    .then(response => {
        dispatch({type: UPDATE_RELATIONSHIP, payload: response.data});
    })
    .catch(err => {
        console.log(err);
    })
}

//this function run in background

export const addVisitor = (data) => (dispatch) => {
    api.post(`/profile/visitprofile`, data)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    return Promise.resolve();
}

export const getListFriends = (type) => (dispatch) => {
    api.get(`/friends/${type}`)
    .then(response => {
        console.log(response.data);
        if(type == 'you-like') {
            dispatch({type: GET_FRIENDS_YOU_LIKED, payload: response.data});
        } else if(type == 'like-you') {
            dispatch({type: GET_FRIENDS_LIKED_YOU, payload: response.data});
        } else if (type == 'visited') {
            dispatch({type: GET_FRIENDS_VISITED, payload: response.data});
        }
    })
    .catch(err => {
        console.log(err);
    })
}

export const verifyIdCard = (data) => dispatch => {
    api.post(`/verify-id-card`, data).then(res => {
        dispatch({type: VERIFY_ID_CARD, payload: res.data});
        window.location.reload();
    }).catch(err => {
        console.log(err);
        window.alert("Đã có lỗi xảy ra. Vui lòng thử lại");
    })
}

export const updateAvatar = (data) => (dispatch) => {
    api.post(`/update-avatar`, data).then(res => {
        dispatch({type: UPDATE_USER_DETAIL, payload: res.data});
    }).catch(err => {
        console.log(err);
        window.alert("Đã có lỗi xảy ra. Vui lòng thử lại");
    })
}

export const getFeaturedUserPhotos = (user_id) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/user/${user_id}/featured-photos`).then(res => {
            dispatch({type: GET_FEATURED_USER_PHOTOS, payload: res.data.photos});
            resolve(res.data.photos);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getPhotosByType = (type) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/user/photos/${type}`).then(res => {
            dispatch({type: GET_PHOTOS_BY_TYPE, payload: res.data.photos});
            resolve(res.data.photos);
        }).catch(err => {
            reject(err);
        })
    })
}

export const uploadFeaturedPhotos = (images) => dispatch => {
    return api.post(`/user/featured-photos`, {photos: images}).then(res => {
        dispatch({type: UPLOAD_FEATURED_PHOTOS, payload: res.data.results});
        console.log(res.data);
        // window.location.reload();
    }).catch(err => {
        reject(err);
    })
}

export const getUserConfiguration = () => dispatch => {
    return new Promise((resolve, reject) => {
        api.get(`/user/configurations`).then(res => {
            dispatch({type: GET_USER_CONFIGURATIONS, payload: res.data.configurations});
            resolve(res.data.configurations);
        }).catch(err => {
            reject(err);
        })
    })
}

export const updateUserConfiguration = (data) => dispatch => {
    api.post(`/user/configurations`, {data: {...data}}).then(res => {
        dispatch({type: UPDATE_USER_CONFIGURATIONS, payload: res.data});
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    })
}

export const updatePassword = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        return api.post(`/user/password`, data).then(res => {
            dispatch({type: UPDATE_PASSWORD});
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    })
}

export const getIdCardVerify = () => dispatch => {
    return new Promise((resolve, reject) => {
        return api.get(`/verify-id-card`).then(res => {
            dispatch({type: GET_ID_CARD_VERIFY, payload: res.data.record});
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    })
}