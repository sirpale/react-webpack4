import React, {Component} from 'react';

import FontAwesome  from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
import {Button} from 'antd';

import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

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

  static _Click(e) {
    console.log('Click',e);
  }

  static _Tap(e) {
    console.log('Tap',e)
  }

  componentWillMount() {
    console.log('willMount','在渲染前调用，在客户端也在服务端！');
    // injectTapEventPlugin();
  }

  componentDidMount() {
    console.log('didMount','在第一次渲染后调用，只在客户端');
  }

  componentWillReceiveProps() {
    console.log('willReceiveProps','在组件接受到一个新的props')
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate','返回一个布尔值，在接受到新的props和state后');
    return true;
  }

  componentWillUpdate() {
    console.log('willUpdate','在组件接受新的props或state，但还没有render');
  }

  componentDidUpdate() {
    console.log('didUpdate','在组件完成更新后立即调用');
  }

  componentWillUnmount() {
    console.log('willUnmount','在组件从DOM中移除时');
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
        <Button onClick={() => this._handleClick()}>自增</Button>
      </div>
    )
  }
}