import React, {Component} from 'react';

import FontAwesome  from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import './css/index.scss';
import './css/home.css';
import './css/home.less';

import cxy from './images/1.jpg';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count:0
    }
  }

  _handleClick() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return (
      <div className="home-box">
        {/*<FontAwesome className="fa fa-user"*/}
          {/*name="rocket"*/}
          {/*cssModule={faStyles}*/}
          {/*size="3x"*/}
          {/*spin*/}
          {/*style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}*/}
        {/*/>*/}
        <img src={cxy} alt=""/><br />
        this is 22222222222222222222222<br />
        当前计数：{this.state.count}<br />
        <button onClick={() => this._handleClick()}>自增</button>
      </div>
    )
  }
}