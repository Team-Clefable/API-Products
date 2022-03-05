const express = require('express');
const app = express();
const models = require('./models.js');

app.get('/products', models.getAll);

app.get('/products/:id', models.getOne);

app.get('/products/:id/styles', models.getStyles);

app.get('/products/:id/related', models.getRelated);

app.listen(3000, () => {
  console.log('listening on porrrt');
})