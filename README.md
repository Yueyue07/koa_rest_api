# koa_rest_api
This project is to make a single resource REST app using Koa. In the end, we will contrast this app with the apps we have built with Express and vanilla Node Http.  


## Koa
Koa is a new framework designed by the team behind Express.


### Installation

```bash
$ npm install koa
```

### Usage

The hello world application:

```js
var koa = require('koa');
var app = koa();

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
```

### Koa vs Express vs Vanilla Node Http

## Routing

# Koa requires an additional router.

```js
var koa = require('koa');
var app = koa();
var router = require('koa-route');

app.use(router.get('/api/items', function*() {
    this.body = 'Get';
}));
app.use(route.post('/api/items', function*() {
    this.body = 'Post';
}));
```

# Express uses a built-in router.  

```js
var express = require('express');
var app = express();
var router = express.Router();

router.route('/items')
.get(function(req, res, next) {
  res.send('Get');
})
.post(function(req, res, next) {
  res.send('Post');
});
app.use('/api', router);
```

# Vanilla Node relies on conditional statements

```js
if (req.method === 'GET' && req.url === '/api/items') {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'hello world'}));
  return res.end();
}
if (req.method === 'POST' && req.url === '/api/items') {
  var result = '';
  req.on('data', function(chunk) {
    result += JSON.parse(chunk.toString()).msg;
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'hello ' + result}));
    return res.end();
  });
}
```

## Async and Callbacks

# Koa
Koa uses ES6 generators.  A generator function is denoted by an asterisk and returns a generator object.  By using the "yield" statement, generator functions have more flexibility in terms of when/if the function runs to completion.  By using ES6 generators, Koa avoids certain problems that may arise from multiple callbacks.  

```js
app.use(function *() {
    this.body = 'Hello world';
});
```

# Express
Express relies exclusively on asyncronous callbacks.  

```js
app.get('/', function(req, res) {
    res.send('Hello world');
});
```

## Creating Servers

Koa and Express use identical syntax to create servers.  

## Error Handling

## Overall

Overall, Koa is more lightweight and allows developers to use only what they need.  Depending on the project or application, this may be preferable.  Koa also relies less on middleware than Express.  While Express does boast an included router, it is not much extra work to require in one of many available koa routers.  

Additional Sources:
https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md
https://www.airpair.com/node.js/posts/nodejs-framework-comparison-express-koa-hapi
