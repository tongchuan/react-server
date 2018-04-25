// const Koa = require('koa');
// const Router = require('koa-router');
// const index = require('./src/containers/indexContainer')
import fs from 'fs';
import Koa from 'koa';
import koaStatic from 'koa-static';
// import http from 'http';
import Router from 'koa-router';
import React from 'react';
import {renderToString,renderToStaticMarkup} from 'react-dom/server'

import { Provider } from 'react-redux';
import {Switch, Router as ReactRouter, Route as ReactRoute,BrowserRouter } from 'react-router-dom';
import { ROUTERS } from './src/router'
// import { createHashHistory, createBrowserHistory } from 'history';
import store from './src/redux/index';
import Index from './src/containers/indexContainer';
import News from './src/containers/newsContainer';
import User from './src/containers/userContainer';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import newsActions from './src/redux/actions/newsActions'

// const ROUTERS = [
//   {url: '/', component(){return <Index store={store}  />}},
//   {url: '/news', component:News},
//   {url: '/user', component(){return <User store={store}  />}},
// ];

// import IndexContainer from './src/containers/indexContainer';
const app = new Koa();
const router = new Router();
async function readHTML(html, ctx) {
  let data_html = ''
  data_html = fs.readFileSync('./index.html','utf8')
  data_html = data_html.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`);
  ctx.body = data_html
  // return data_html
}
app.use(koaStatic(__dirname+ "/dist"));
app.use((ctx, next) => {
  app.context.html_data = fs.readFileSync('./dist/index.html','utf8')
  console.log('user')
  next();
})
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});


router.get('*', async (ctx, next) => {
  let App;
  ROUTERS.forEach((item)=>{
    if(item.path === ctx.url) {
      App = item.dom
    }
  })
  
  // console.log(News)
  let html = renderToStaticMarkup(
    <Provider store={store} >
     {App}
   </Provider>
  );
  // renderToString
  // ctx.accepts('html')
  // let html = ''
  // ROUTERS.forEach((item)=>{
  //   if(ctx.url === item.url){
  //     html = renderToStaticMarkup(<Provider store={store}>
  //       <ReactRouter>
  //         <ReactRoute path={item.url} component={item.component} />
  //       </ReactRouter>
  //     </Provider>)
  //     console.log(html+'html')
  //   }
    
  // })
  // console.log(html);
  // renderToStaticMarkup(<IndexContainer />);
  // fs.readFile('./index.html','utf8',(err, data) => {
    let body = app.context.html_data.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
    // console.log(body)
    ctx.body = body;
  // })
  // await readHTML(renderToString(<IndexContainer />),ctx)
  // ctx.body = 'Hello World';
});

// app.on('error', (err, ctx) => {
//   log.error('server error', err, ctx)
// });

app
  .use(router.routes())
  .use(router.allowedMethods());

// http.createServer(app.callback()).listen(3001)
app.listen(3001);