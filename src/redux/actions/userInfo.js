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

    return fetch('http://localhost:3000/api/user.json')
      .then((res => {
        return res.json();
      }))
      .then(json => {
        dispatch(getUserInfoSuccess(json))
      })
      .catch(
        () => {
          dispatch(getUserInfoFail());
        }
      )
  }
}









