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
/*
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});*/



