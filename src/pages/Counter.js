import React, {Component} from 'react';
import {Button} from 'antd';

import {increment, decrement, reset} from 'actions/counter';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
};

const mapDispatchToProps = dispatch => {
  return {
    increment() {
      dispatch(increment());
    },
    decrement() {
      dispatch(decrement());
    },
    reset() {
      dispatch(reset());
    }
  }
};

class Counter extends Component {
  render() {
    return (
      <div>
        <div className="">当前计数为：{this.props.counter.count}</div>
        <Button onClick={() => this.props.increment()}>自增</Button>
        <Button onClick={() => this.props.decrement()}>自减</Button>
        <Button onClick={() => this.props.reset()}>重置</Button>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter);