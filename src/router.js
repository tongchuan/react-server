import React from 'react';
import Index from './containers/indexContainer';
import News from './containers/newsContainer';
import User from './containers/userContainer';

export const ROUTERS = [
  {path: '/', component:Index, dom:<Index />},
  {path: '/news', component:News, dom:<News />},
  {path: '/user', component:User, dom:<User />},
];

export default class RouterList extends React.Component {
  render() {
    return (
      [ROUTERS.map((item,i)=>{
        return (
          <Route key={i} path={item.path} exact component={item.path}/>
        )
      })]
    )
  }
}