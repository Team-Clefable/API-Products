const express = require('express');
const app = express();
const models = require('./models.js');

app.get('/products', models.getAll);

app.get('/products/:id', models.getOne);

app.get('/products/:id/styles', models.getStyles);

app.get('/products/:id/related', models.getRelated);

app.get('/loaderio-3edc732ab67d8563f4d679851c68e65e.txt', (req, res) => {
  res.status(200).send('loaderio-3edc732ab67d8563f4d679851c68e65e');
})

app.listen(3000, () => {
  console.log('listening on porrrt');
})