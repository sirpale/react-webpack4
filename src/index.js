import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';

import getRouter from './router/router';


import './pages/css/reset.scss';
import './pages/css/glob.scss';

let htmlFontSize = () => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  let htmlDOM = document.getElementsByTagName('html')[0];

  htmlDOM.style.fontSize = htmlWidth / 10 + 'px';


  window.addEventListener('resize',(e) => {
    let w = document.documentElement.clientWidth || document.body.clientWidth;
    htmlDOM.style.fontSize = w / 10 + 'px';
  });
};




htmlFontSize();

let renderWithHotReload = RootElement => {
 ReactDom.render(
   <AppContainer>
     <Provider store={store}>
       {RootElement}
     </Provider>
   </AppContainer>,
   document.getElementById('app')
 )
};

renderWithHotReload(getRouter());

if(module.hot) {
  module.hot.accept('./router/router',() => {
    const getRouter = require('./router/router').default;
    renderWithHotReload(getRouter());
  });
}








