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

# Koa vs Express vs Vanilla Node Http

## Routing

### Koa does not have a built-in router:

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

### Express includes a built-in router  

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

### Vanilla Node relies on conditional statements

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

### Koa
Koa uses ES6 generators.  A generator function is denoted by an asterisk and returns a generator object.  By using the "yield" statement, generator functions have more flexibility in terms of when/if the function runs to completion.  By using ES6 generators, Koa avoids certain problems that may arise from multiple callbacks.  

```js
app.use(function *() {
    this.body = 'Hello world';
});
```

### Express
Express relies exclusively on asyncronous callbacks.  

```js
app.get('/', function(req, res) {
    res.send('Hello world');
});
```

## Middleware

### Koa

When a middleware invokes `yield next`, the function suspends and passes control to the next middleware defined. After there are no more middleware to execute downstream, the stack will unwind and each middleware is resumed to perform its upstream behavior.

### Express
In Express, the middleware is the same as Koa, passed next as a callback. The difference is that Koa uses `yield next` to call the next function and express uses `next()` to call next middleware function. Another big difference is that `yield next` can be placed anywhere in the function but `next()` can only be placed at the end of the function. There is no middleware function in vanilla node http, which limits  http functionality.

## Response Body

### Koa

In Koa, response.body can be set to any object, such as String, Buffer or Stream.  The Content-Type is defaulted depending on the object type.  For example:

String
The Content-Type is defaulted to text/html or text/plain, both with a default charset of utf-8. The Content-Length field is also set.

Buffer
The Content-Type is defaulted to application/octet-stream, and Content-Length is also set.

Stream
The Content-Type is defaulted to application/octet-stream.

Object
The Content-Type is defaulted to application/json.  

### Express

In Express, response can be sent with string or json (e.g. res.send or res.json).

## Context

### Koa
In Koa, context encapsulates nodes' request and response objects into a single object:

```js
app.use(function *() {
  this; // is the context
  this.request; // is a koa request
  this.response; // is a koa response
});
```
### Express
In Express, request and response are separate objects, just as vanilla node http requests and responses are treated as separate objects:

```js
app.use('/', function (req, res) {
  req;  // this is an express request
  res;  // this is an express response
});
```

## Overall

### Advantages
Overall, Koa is more lightweight and allows developers to use only what they need.  Depending on the project or application, this may be preferable.  Koa also relies less on middleware than Express.  Koa's response body accepts any object type while Express is limited to only strings and json.  

### Disadvantages
While Koa lacks a built-in router, but it is not much extra work to require in one of many available Koa routers.  In Koa, context encapsulates nodes' request and response objects into a single object.  This can be confusing for those of us coming from Express.  

Additional Sources:
https://github.com/koajs/koa/blob/master/docs/koa-vs-express.md
https://www.airpair.com/node.js/posts/nodejs-framework-comparison-express-koa-hapi
