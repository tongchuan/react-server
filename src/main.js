import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch, withRouter,BrowserRouter } from 'react-router-dom';
import store from './redux/index';
import { createHashHistory, createBrowserHistory } from 'history';
import { ROUTERS } from './router'

import Index from './containers/indexContainer';
import News from './containers/newsContainer';
import User from './containers/userContainer';
// let history = createHashHistory(store);
let history = createBrowserHistory(store);
console.log(history)
ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/news" exact component={News}/>
          <Route path="/user" exact component={User}/>
        </Switch>
      </Router>
    </Provider>,
  document.getElementById('root')
);

// export const ROUTERS = [
//   {url: '/', component(props){return <Index store={store} {...props} />}},
//   {url: '/news', component(props){return <News store={store} {...props} />}},
//   {url: '/user', component(props){return <User store={store} {...props} />}},
// ];