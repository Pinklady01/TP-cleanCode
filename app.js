require('dotenv').config();

const express = require('express');
const models = require('./models');
const controllers = require('./controllers');
const routes = require('./routes');
const cors = require('cors');

const app = express();
routes(app);
app.use(cors({
  origin: true,
  credentials: true
}));
app.options("*", cors());

async function bootstrap() {
  await models.sequelize.authenticate();
  await models.sequelize.sync();
}
bootstrap();

app.get('/', function (req, res) {
  res.send('Hello world!')
});

async function createAdminAccount() {
  await controllers.AuthentificationController.register("cleancode@gmail.com",
      "Admin");
}


createAdminAccount();

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});




