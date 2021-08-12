const express = require('express')
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const port = 3000
const app = express()

const routes = require('./server/routes/index');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'client')));
app.use(logger('dev'));
app.use(cookieParser());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
