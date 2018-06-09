/**
 * @Project react-webpack4
 * @Author Sirpale
 * @Description
 * @Date Created in 2018\6\9 0009 by 22:41
 */
import React, {Component} from 'react';

import './css/layer.scss';


export default class Layer extends Component {
  render() {
    return (
      <ul className="wrap">
        <li>
          <a href="javascript:void(0);">111</a>
        </li>
        <li>
          <a href="javascript:void(0);">222</a>
        </li>
        <li>
          <a href="javascript:void(0);">333</a>
        </li>
        <li>
          <a href="javascript:void(0);">444</a>
        </li>
        <li>
          <a href="javascript:void(0);">555</a>
        </li>
      </ul>
    )
  }
}