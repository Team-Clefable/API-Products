const db = require('../db/index.js');

module.exports = {
  getAll: async function(req, res) {
    try {
      const selectAll = await db.getAll();
      res.status(200).send(selectAll.rows);
    } catch(err) {
      console.log('ERRor in models getALl', err);
      res.status(404).send(err);
    }
  },

  getOne: async function(req, res) {
    try {
      let id = req.params.id;
      const selectProduct = await db.getOne(id);
      res.status(200).send(selectProduct);
    } catch(err) {
      console.log('ERRor in models getOne', err);
      res.status(404).send(err);
    }
  },

  getStyles: async function(req, res) {
    try {
      let id = req.params.id;
      const selectStyles = await db.getStyles(id);
      res.status(200).send(selectStyles);
    } catch(err) {
      console.log('ERRor in models getStyles', err);
      res.status(404).send(err);
    }
  },

  getRelated: async function(req, res) {
    try {
      let id = req.params.id;
      const relatedProducts = await db.getRelated(id);
      res.status(200).send(relatedProducts);
    } catch(err) {
      console.log('ERRor in models getRelated');
      res.status(404).send(err);
    }
  }


}


