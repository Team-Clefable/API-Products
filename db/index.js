const { Pool, Client } = require('pg');

const credentials = {
  user: 'SarahMa',
  host: 'localhost',
  database: 'products',
  password: 'root',
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


    const oneFeatureData = await pool.query(featureString);
    const oneProductData = await pool.query(productString);

    let oneFeature = oneFeatureData.rows;
    let oneProduct = oneProductData.rows;

    oneProduct[0].features = oneFeature;

    await pool.end();
    return oneProduct;
  },

  getStyles: async function poolConnect3(id) {
    const pool = new Pool(credentials);

    // const testQuery = "SELECT styles_table.style_id, styles_table.name, styles_table.original_price, styles_table.sale_price, styles_table.default_style, skus_table.id, skus_table.style_id, skus_table.quantity, skus_table.size, photos_table.style_id, photos_table.pic_url, photos_table.thumbnail_url FROM styles_table, skus_table, photos_table WHERE styles_table.product_id = 1 AND skus_table.style_id = styles_table.style_id AND styles_table.style_id = photos_table.style_id";

    const stylesQuery = `SELECT style_id, name, original_price, sale_price, default_style FROM styles_table WHERE product_id = ${id}`;

    //find skus of ONE style id => output array of objects [{}, {}]
    const skusQuery = `SELECT skus_table.id, skus_table.style_id, skus_table.quantity, skus_table.size FROM skus_table INNER JOIN styles_table ON styles_table.style_id = skus_table.style_id WHERE styles_table.product_id = ${id}`;

    const photosQuery = `SELECT photos_table.style_id, photos_table.pic_url, photos_table.thumbnail_url FROM photos_table INNER JOIN styles_table ON styles_table.style_id = photos_table.style_id WHERE styles_table.product_id = ${id}`;

    // const testData = await pool.query(testQuery);
    const stylesData = await pool.query(stylesQuery);
    const skusData = await pool.query(skusQuery);
    const photosData = await pool.query(photosQuery);
    await pool.end();

    // const test = testData.rows;
    const styles = stylesData.rows;
    const skus = skusData.rows;
    const photos = photosData.rows;


   for (let entry of styles) {
    let currentId = entry.style_id;
    let photosArray = [];
    let skusObj = {};

    //change default_style to default? bool
    if (entry.default_style === 1) {
      entry['default?'] = true;
    } else {
      entry['default?'] = false;
    }

    delete entry.default_style;

    //add photos as array
    for (let obj of photos) {
      if (obj.style_id === currentId) {
        photosArray.push({
          thumbnail_url: obj.thumbnail_url,
          url: obj.pic_url
        })
      }
      entry.photos = photosArray;
    }

    //add skus as object
    for (let obj of skus) {
      if (obj.style_id === currentId) {
        skusObj[obj.id]= {
          quantity: obj.quantity,
          size: obj.size
        }
      }
      entry.skus = skusObj;
    }
   }

   //add all data together
    const allStyles = {
      product_id : `${id}`,
      results : styles
    }


    return allStyles;
  },

  getRelated: async function poolConnect4(id) {
    const pool = new Pool(credentials);
    // const relatedQuery = `SELECT related_table.current_product_id AS product_id, ARRAY_AGG(related_table.related_product_id) AS related_ids FROM related_table GROUP BY related_table.current_product_id HAVING ${id}= ANY(ARRAY_AGG(related_table.current_product_id))`;
    const relatedQuery = `SELECT related_product_id FROM related_table WHERE current_product_id = ${id}`;
    const relatedProductsData = await pool.query(relatedQuery);
    const relatedProducts = relatedProductsData.rows;
    await pool.end();

    const allRelatedProducts = [];
    for (entry of relatedProducts) {
      allRelatedProducts.push(entry.related_product_id);
    }

    return allRelatedProducts;
    // return relatedProducts.rows[0].related_ids;
  }
}

// const [
//   oneFeature,
//   oneProduct,
// ] = await Promise.all([
//   pool.query(featureString),
//   pool.query(productString),
// ])





