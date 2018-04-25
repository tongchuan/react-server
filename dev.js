import Koa from 'koa';
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
import Router from 'koa-router';
import koaStatic from 'koa-static';
const views = require('koa-views');
const opn = require('opn');
const app = new Koa();
const autoOpenBrowser = true;
const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
  // contentBase:Config.publicPath,
  logLevel: 'error',
  logTime: true,
  historyApiFallback: false,
  noInfo: true,
  // filename: webpackConfig.output.filename,
  // publicPath: Config.output.publicPath,
  quiet: true,
  hot: true,
  stats: { colors: true },
  headers: { 'X-Custom-Header': 'yes' },
  stats: {
    colors: true
  }
});
const hotMiddleware = webpackHotMiddleware(compiler,{
  log: (msg) => { console.log(msg); }
});
// app.use(koaStatic(__dirname+ "/dist"));
app.use(devMiddleware);
app.use(hotMiddleware);
const router = new Router();
// router.use(views(__dirname + '/dist'));

let port = 3000
var uri ='http://localhost:' + port

var _resolve;
// var readyPromise = 
new Promise(resolve => {
  _resolve = resolve;
});
console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  // when env is testing, don't need open it
  if (autoOpenBrowser) {
    opn(uri);
  }
  _resolve();
});
// router.get('*', async (ctx, next) => {
//   await ctx.render('./index');
//   // console.log(ctx.url)
//   // next();
// })
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(port);