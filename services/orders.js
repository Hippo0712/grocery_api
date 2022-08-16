const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM products LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(product){
  const result = await db.query(
    `INSERT INTO products 
    (name, desc, SKU, price, stock) 
    VALUES 
    (${product.name}, ${product.desc}, ${product.SKU}, ${product.price}, ${product.stock})`
  );

  let message = 'Error in creating product';

  if (result.affectedRows) {
    message = 'Product created successfully';
  }

  return {message};
}

async function update(id, product){
  const result = await db.query(
    `UPDATE products 
    SET name="${product.name}", desc=${product.desc}, SKU=${product.SKU}, 
    price=${product.price}, stock=${product.stock} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'product updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM products WHERE id=${id}`
  );

  let message = 'Error in deleting product';

  if (result.affectedRows) {
    message = 'Product deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}