import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';

import getRouter from './router/router';


import './pages/css/reset.scss';
import './pages/css/glob.scss';

let htmlFontSize = (doc => {
  let htmlWidth = doc.documentElement.clientWidth || doc.body.clientWidth;
  let htmlDOM = doc.getElementsByTagName('html')[0];

  htmlDOM.style.fontSize = htmlWidth / 10 + 'px';


  window.addEventListener('resize',(e) => {
    let w = doc.documentElement.clientWidth || doc.body.clientWidth;
    htmlDOM.style.fontSize = w / 10 + 'px';
  });
})(document);


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








