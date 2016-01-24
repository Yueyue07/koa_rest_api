const koa = require('koa');
const app = koa();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_UR || 'mongodb://localhost/bears_app_dev');


var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up: ' + PORT));
//Run: mongod --dbpath=./db --smallfiles before server up
