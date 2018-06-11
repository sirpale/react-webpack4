
import React, {Component} from 'react';
import {
  LocaleProvider,
  DatePicker,
  message
} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './css/page1.scss';


moment.locale('zh-cn');


export default class Page1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: ''
    }
  }

  handleChange(date) {
    message.info('您选择的日期是：' + date ? date.toString() : '');
    this.setState({ date });
  }

  render() {
    return (

        <LocaleProvider locale={zhCN}>
          <div style={{width:400, margin:'10px auto'}}>
            <DatePicker onChange={value => this.handleChange(value)} />
            <div style={{marginTop:20}}>
              <p>当前时间是：{this.state.date && this.state.date.toString()}</p>
              </div>
          </div>
        </LocaleProvider>

    )
  }
}