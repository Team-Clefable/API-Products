# Product Information API

The endpoint for the Product Overview module. This is a RESTful API that serves up data including product images, description, prices, styles, skus, and quantities to a retail site web application. 

## Installation

After forking and cloning repo:

```bash
  npm install
  npm run start:server
```
    
## API Reference

#### Gets first 10 products

```http
  GET /products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | Defaults to returning first page of results |

#### Returns all product information for one specific product

```http
  GET /products/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of product to fetch |

#### Returns all product information for one specific product

```http
  GET /products/:id/styles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of product to fetch |

#### Returns all product information for one specific product

```http
  GET /products/:id/related
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of product to fetch |







## Tech Stack

PostgreSQL, Express, Loader.io, NGINX, Node.js, Amazon AWS
