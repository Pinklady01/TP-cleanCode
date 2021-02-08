require('dotenv').config();

const express = require('express');
const models = require('./models');
const routes = require('./routes');
const cors = require('cors');

const app = express();
routes(app);
app.use(cors({
  origin: true,
  credentials: true
}));
app.options("*", cors());

app.get('/', function (req, res) {
  res.send('Hello world!')
});

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});




