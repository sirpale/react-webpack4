import fetchJsonp from 'fetch-jsonp';

export const GET_USER_INFO_REQUEST = "userInfo/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "userInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "userInfo/GET_USER_INFO_FAIL";


let getUserInfoRequest = () => {
  return{
    type: GET_USER_INFO_REQUEST
  }
};

let getUserInfoSuccess = (userInfo) => {
  return {
    type: GET_USER_INFO_SUCCESS,
    userInfo: userInfo
  }
};

let getUserInfoFail = () => {
  return {
    type: GET_USER_INFO_FAIL
  }
};


export function getUserInfo() {
  return dispatch => {

    dispatch(getUserInfoRequest());

    return fetch(
        'https://www.apiopen.top/satinApi?type=1&page=1'
      // {
      //   jsonpCallback: 'jsonp9'
      // }
        // {
        //   method: 'POST',
        //   mode: 'no-cors',
        //   headers: {
        //     'Content-Type' :'application/x-www-form-urlencoded'
        //   },
        //   body: ''
        // }
      )
      .then((res => {
        return res.json();
      }))
      .then(json => {
        console.log(json);
        dispatch(getUserInfoSuccess(json.data))
      })
      .catch(
        (ex) => {
          dispatch(getUserInfoFail());
        }
      )
  }
}









