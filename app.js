const express = require('express');
const models = require('./models');
const routes = require('./routes');
const cors = require('cors');

const app = express();

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

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});

routes(app);


