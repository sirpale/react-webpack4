import React from 'react';

import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';

import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo';
import Layer from 'bundle-loader?lazy&name=layer!pages/Layer';

// import Home from 'pages/Home';
// import Page1 from 'pages/Page1';
// import Counter from 'pages/Counter';
// import UserInfo from 'pages/UserInfo';
// import Layer from 'pages/layer';


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
      <div className="nav">
        <Link to="/">
          <FontAwesome className="fa fa-home"
                       name="rocket"
                       cssModule={faStyles}
                       size="3x"
                       spin
                       style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
          />
          <em>首页</em>

        </Link>
        <Link to="/page1">
          <FontAwesome className="fa fa-pagelines"
                       name="rocket"
                       cssModule={faStyles}
                       size="3x"
                       spin
                       style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
          />
          <em>内页</em>
        </Link>
        <Link to="/counter">
          <FontAwesome className="fa fa-cab"
                       name="rocket"
                       cssModule={faStyles}
                       size="2x"
                       spin
                       style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
          />
          <em>计数器</em>
        </Link>
        <Link to="/userinfo">
          <FontAwesome className="fa fa-gamepad"
                       name="rocket"
                       cssModule={faStyles}
                       size="3x"
                       spin
                       style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
          />
          <em>异步获取</em>
        </Link>
        <Link to="/layer">
          <FontAwesome className="fa fa-language"
                       name="rocket"
                       cssModule={faStyles}
                       size="3x"
                       spin
                       style={{ textShadow: '0 1px 0 rgba(0, 0, 0, .1)' }}
          />
          <em>布局</em>
        </Link>
      </div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={createComponent(Home)} />
          <Route path="/page1" component={createComponent(Page1)}/>
          <Route path="/counter" component={createComponent(Counter)}/>
          <Route path="/userinfo" component={createComponent(UserInfo)}/>
          <Route path="/layer" component={createComponent(Layer)}/>

          {/*<Route exact path="/" component={Home} />*/}
          {/*<Route path="/page1" component={Page1}/>*/}
          {/*<Route path="/counter" component={Counter}/>*/}
          {/*<Route path="/userinfo" component={UserInfo}/>*/}
          {/*<Route path="/layer" component={Layer}/>*/}

        </Switch>
      </div>
    </div>
  </Router>
);

export default getRouter;
