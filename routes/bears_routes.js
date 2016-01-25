const Bear = require(__dirname + '/../models/bear');
const handleError = require(__dirname + '/../lib/handle_error');
const router = module.exports = exports = require('koa-router')({
  prefix: '/api'
});
var koaBody = require('koa-body')();


router.post('/bears', koaBody,
  function *(next) {
    this.body = yield Bear.create(this.request.body,(err,data) => {
      if(err) handleError(err);
    });
  });


router.get('/bears', function *(next) {
  this.body = yield Bear.find({},(err,data) => {
    if(err) handleError(err);
  });
});
