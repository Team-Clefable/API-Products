

-------------------------------------------------------------------------------
--            products
-------------------------------------------------------------------------------
-- DROP DATABASE IF EXISTS products;
-- CREATE DATABASE products;

DROP TABLE IF EXISTS products_table CASCADE;
CREATE TABLE products_table (
    id INT PRIMARY KEY,
    name VARCHAR,
    slogan VARCHAR,
    description TEXT,
    category VARCHAR,
    default_price DECIMAL(12, 2)
);


-------------------------------------------------------------------------------
--            styles
-------------------------------------------------------------------------------

DROP TABLE IF EXISTS styles_table CASCADE;
CREATE TABLE styles_table (
    style_id INT PRIMARY KEY,
    name VARCHAR,
    sale_price DECIMAL(12, 2) NULL,
    original_price DECIMAL(12, 2),
    default_style INT,
    product_id INT references products_table (id)
);


-------------------------------------------------------------------------------
--            features
-------------------------------------------------------------------------------

DROP TABLE IF EXISTS features_table CASCADE;
CREATE TABLE features_table (
    id INT PRIMARY KEY,
    product_id INT references products_table (id),
    feature VARCHAR,
    value VARCHAR
);

-------------------------------------------------------------------------------
--            skus
-------------------------------------------------------------------------------

DROP TABLE IF EXISTS skus_table CASCADE;
CREATE TABLE skus_table (
    id INT PRIMARY KEY,
    style_id INT references styles_table (style_id),
    size VARCHAR(10),
    quantity INT
);

-------------------------------------------------------------------------------
--            photos
-------------------------------------------------------------------------------

DROP TABLE IF EXISTS photos_table CASCADE;
CREATE TABLE photos_table (
    id INT PRIMARY KEY,
    style_id INT references styles_table (style_id),
    pic_url VARCHAR,
    thumbnail_url VARCHAR
);

-------------------------------------------------------------------------------
--            related
-------------------------------------------------------------------------------

DROP TABLE IF EXISTS related_table CASCADE;
CREATE TABLE related_table (
    id INT PRIMARY KEY,
    current_product_id INT,
    related_product_id INT

);
-------------------------------------------------------------------------------

-- Creating Secondary Indexes

CREATE INDEX product_id_index ON styles_table(product_id);
CREATE INDEX style_id_index ON photos_table(style_id);
CREATE INDEX style_id2_index ON skus_table(style_id);
CREATE INDEX product_id2_index ON related_table(current_product_id);
CREATE INDEX product_id3_index ON features_table(product_id);
