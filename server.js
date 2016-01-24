const koa = require('koa');
const app = koa();
const bearsRouter = require(__dirname + '/routes/bears_routes');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_UR || 'mongodb://localhost/bears_app_dev');

app.use(bearsRouter.routes());
//route /api included in bears_routes.js file


var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up: ' + PORT));
//Run: mongod --dbpath=./db --smallfiles before server up
