const express = require('express');
const app = express();
const models = require('./models.js');

app.get('/products', models.getAll);

app.get('/products/:id', models.getOne);

app.get('/products/:id/styles', models.getStyles);

app.get('/products/:id/related', models.getRelated);

app.get('/loaderio-cdb9dd42004cce02c46b09e4705b2e1a.txt', (req, res) => {
  res.status(200).send('loaderio-cdb9dd42004cce02c46b09e4705b2e1a');
})

app.listen(3000, () => {
  console.log('listening on porrrt');
})