import React, {Component} from 'react';

import './css/index.scss';
import './css/home.css';
import './css/home.less';

import logo from './images/logo.png';

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
        <img src={logo} alt=""/><br />
        this is 22222222222222222222222<br />
        当前计数：{this.state.count}<br />
        <button onClick={() => this._handleClick()}>自增</button>
      </div>
    )
  }
}