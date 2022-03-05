-- \i /Users/SarahMa/Clefable-API-Products/db/schema.sql;

-- Download the DATAaaaa

\COPY products_table from '/Users/SarahMa/Clefable-API-Products/db/allData/products.csv' DELIMITER ',' CSV HEADER;

\COPY styles_table (id, name, sale_price, original_price, default_style, product_id) from '/Users/SarahMa/Clefable-API-Products/db/allData/styles.csv' WITH (FORMAT CSV, NULL 'null', HEADER);

\COPY skus_table (id, style_id, size, quantity) from '/Users/SarahMa/SDC-data/skus.csv' DELIMITER ',' CSV HEADER;

\COPY photos_table from '/Users/SarahMa/Clefable-API-Products/db/allData/photos.csv' DELIMITER ',' CSV HEADER;

\COPY features_table from '/Users/SarahMa/Clefable-API-Products/db/allData/features.csv' DELIMITER ',' CSV HEADER;

\COPY related_table from '/Users/SarahMa/Clefable-API-Products/db/allData/related.csv' DELIMITER ',' CSV HEADER;


-- Alter Some Tables Here

-- ALTER TABLE products_table
-- ADD COLUMN features VARCHAR ARRAY;
-- SET features = array[(select )]