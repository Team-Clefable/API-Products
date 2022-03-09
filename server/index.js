const express = require('express');
const app = express();
const models = require('./models.js');

app.get('/products', models.getAll);

app.get('/products/:id', models.getOne);

app.get('/products/:id/styles', models.getStyles);

app.get('/products/:id/related', models.getRelated);

app.get('/loaderio-01ee2201a1d45c621f7cb1f7d49bfde7.txt', (req, res) => {
  res.status(200).send('loaderio-01ee2201a1d45c621f7cb1f7d49bfde7');
})

app.listen(3000, () => {
  console.log('listening on porrrt');
})