import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from 'actions/userInfo';

import './css/userinfo.scss';

let htmlList = (list) => {
  let res = [];

  for(let i=0;i<list.length;i++) {
    res.push(
      <dl key={i}>
        <dd>

          <b><img src={list[i].profile_image} alt=""/></b>
          <p>
            {list[i].name}<br />
            {list[i].text}
          </p>
        </dd>
        <dt>
          <a href="javascript:void(0);"><img src={list[i].bimageuri} alt=""/></a>
        </dt>

      </dl>
    )
  }

  return res;
};


class UserInfo extends Component {
  render() {
    const {userInfo, isLoading, errorMsg} = this.props.userInfo;

    return (
      <div className="list-img">
        <button onClick={() => this.props.getUserInfo()}>随机获取</button>
        {
          isLoading ? <p style={{'padding':'10px 0'}}>请求信息中......</p> :
            (
              errorMsg ? errorMsg: htmlList(userInfo)
            )
        }

      </div>
    )

  }
}

export default connect(state => ({userInfo: state.userInfo}),{getUserInfo})(UserInfo);