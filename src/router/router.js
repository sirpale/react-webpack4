import React from 'react';

import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import Bundle from './Bundle';

// import Home from 'bundle-loader?lazy&name=home!pages/Home';
// import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1';
// import Counter from 'bundle-loader?lazy&name=counter!pages/Counter';
// import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo';

import Home from 'pages/Home';
import Page1 from 'pages/Page1';
import Counter from 'pages/Counter';
import UserInfo from 'pages/UserInfo';
import Layer from 'pages/layer';


import logo from '../pages/images/logo.png';



const Loading = () => {
  return <div>Loading...</div>
};

const createComponent = component => props => (
  <Bundle load={component}>
    {
      Component => Component? <Component {...props} /> : <Loading />
    }
  </Bundle>
);


const getRouter = () => (
  <Router>
    <div style={{position:"relative",width:"100%",height:"100%"}}>
      <Link to="/" className="logo"><img src={logo}  alt=""/></Link>
      <ul className="nav">
        {/*<li><a href="javascript:void(0);">首页</a></li>*/}
        {/*<li><a href="javascript:void(0);">列表页</a></li>*/}
        {/*<li><a href="javascript:void(0);">计数器</a></li>*/}
        {/*<li><a href="javascript:void(0);">获取数据</a></li>*/}
        {/*<li><a href="javascript:void(0);">布局</a></li>*/}
        <li>
          <Link to="/">
            <FontAwesome className="fa fa-home"
               name="rocket"
               cssModule={faStyles}
               size="3x"
               spin
               style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
            />
           <p>首页</p>

          </Link>
        </li>
        <li>
          <Link to="/page1">
            <FontAwesome className="fa fa-pagelines"
                         name="rocket"
                         cssModule={faStyles}
                         size="3x"
                         spin
                         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
            />
            <p>内页</p>
          </Link>
        </li>
        <li>
          <Link to="/counter">
            <FontAwesome className="fa fa-cab"
                         name="rocket"
                         cssModule={faStyles}
                         size="2x"
                         spin
                         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
          />
            <p>计数器</p>
          </Link>
        </li>
        <li>
        <Link to="/userinfo">
          <FontAwesome className="fa fa-gamepad"
                       name="rocket"
                       cssModule={faStyles}
                       size="3x"
                       spin
                       style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
          />
          <p>异步获取</p>
        </Link>
      </li>
        <li>
          <Link to="/layer">
            <FontAwesome className="fa fa-language"
                         name="rocket"
                         cssModule={faStyles}
                         size="3x"
                         spin
                         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
            />
            <p>布局</p>
          </Link>
        </li>
      </ul>
      <div className="container">
        <Switch className="container">
          {/*<Route exact path="/" component={createComponent(Home)} />*/}
          {/*<Route path="/page1" component={createComponent(Page1)}/>*/}
          {/*<Route path="/counter" component={createComponent(Counter)}/>*/}
          {/*<Route path="/userinfo" component={createComponent(UserInfo)}/>*/}

          <Route exact path="/" component={Home} />
          <Route path="/page1" component={Page1}/>
          <Route path="/counter" component={Counter}/>
          <Route path="/userinfo" component={UserInfo}/>
          <Route path="/layer" component={Layer}/>

        </Switch>
      </div>
    </div>
  </Router>
);

export default getRouter;
