"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const contentRouter = require('./routes/content.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

contentRouter.apply(app);

app.listen(3000, function() {
  console.log('listening on 3000')
});