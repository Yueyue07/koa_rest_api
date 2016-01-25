const Bear = require(__dirname + '/../models/bear');
const handleError = require(__dirname + '/../lib/handle_error');
const router = module.exports = exports = require('koa-router')({
  prefix: '/api'
});
var koaBody = require('koa-body')();

router.post('/bears', koaBody,
  function *(next) {
    this.body = yield Bear.create(this.request.body,(err, data) => {
      if(err) handleError(err);
      console.log(data);
    });
  });

router.get('/bears', function *(next) {
  this.body = yield Bear.find({},(err, data) => {
    if(err) handleError(err);
    console.log(data);
  });
});

router.put('/bears/:id', koaBody, function *(next) {
  var bearData = this.request.body;
  delete bearData._id;
  Bear.update({_id: this.params.id}, bearData, (err, data) => {
    if (err) handleError(err);
    console.log(data);
  });
  this.body = 'success';
});

router.delete('/bears/:id', koaBody, function *(next) {
  Bear.remove({_id: this.params.id}, (err, data) => {
    if (err) return handleError(err);
    console.log(data.result);
  });
  this.body = 'success';
});
