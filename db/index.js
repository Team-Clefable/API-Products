const { Pool, Client } = require('pg');

const credentials = {
  user: 'SarahMa',
  host: 'localhost',
  database: 'products',
  password: '',
  port: 5432
};


module.exports = {
  getAll: async function poolConnect1() {
    const pool = new Pool(credentials);
    const queryString = "SELECT id, name, slogan, description, category default_price FROM products_table LIMIT 5;";
    const allProducts = await pool.query(queryString);
    await pool.end();
    return allProducts;
  },


  getOne: async function poolConnect2(id) {
    const pool = new Pool(credentials);
    const featureString = `SELECT feature, value FROM features_table WHERE product_id = ${id}`;
    const productString = `SELECT products_table.id, products_table.name, products_table.slogan, products_table.description, products_table.category, products_table.default_price FROM products_table WHERE products_table.id =${id}`;


    const oneFeature = await pool.query(featureString);
    const oneProduct = await pool.query(productString);

    let oneFeatureData = oneFeature.rows;

    let oneProductData = oneProduct.rows;
    console.log('producttt', oneProductData);
    oneProductData[0].features = oneFeatureData;

    await pool.end();
    return oneProductData;
  },

  getStyles: async function poolConnect3(id) {
    const pool = new Pool(credentials);
    const stylesQuery = `SELECT * FROM skus_table WHERE style_id = ${id}`;
    const getStyles = await pool.query(stylesQuery);
    console.log('ZZZZZZZZZ', getStyles);
    await pool.end();
    return getStyles.rows;
  },

  getRelated: async function poolConnect4(id) {
    const pool = new Pool(credentials);
    const relatedQuery = `SELECT related_table.current_product_id AS product_id, ARRAY_AGG(related_table.related_product_id) AS related_ids FROM related_table GROUP BY related_table.current_product_id HAVING ${id}= ANY(ARRAY_AGG(related_table.current_product_id))`;
    const relatedProducts = await pool.query(relatedQuery);
    await pool.end();
    return relatedProducts.rows[0].related_ids;
  }
}

// `SELECT products_table.id, products_table.name, products_table.slogan, products_table.description, products_table.category, products_table.default_price, features_table.feature, features_table.value FROM products_table, INNER JOIN features_table ON products_table.id = features_table.product_id WHERE products_table.id = ${id}`;

// const [
//   oneFeature,
//   oneProduct,
// ] = await Promise.all([
//   pool.query(featureString),
//   pool.query(productString),
// ])



//connect with client and first query
// async function clientConnect() {
  //   const client = new Client(credentials);
//   await client.connect();
//   const now = await client.query("SELECT * from products_table limit 5");
//   await client.end();

//   return now;
// }



