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

## Koa vs Express vs Vanilla Node Http
