const router = module.exports = exports = require('koa-router')({
  prefix: '/api'
});
var koaBody = require('koa-body')();


router.get('/get', function *() {
  this.body = {body:'hello'};
  this.status = 201;
  console.log(this.response);
});
