const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const rows = await db.query(
    `SELECT *
    FROM products`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  }
}

async function get(id){
  const rows = await db.query(
    `SELECT *
    FROM products WHERE id = ${id} LIMIT 1`
  );
  const data = helper.emptyOrRows(rows);

  return data[0];
}

async function getByCat(id){
  const rows = await db.query(
    `SELECT *
    FROM products WHERE product_category_id = ${id}`
  );
  const data = helper.emptyOrRows(rows);

  return data[0];
}

async function getAllCat(){
  const rows = await db.query(
    `SELECT *
    FROM product_categories`
  );
  const data = helper.emptyOrRows(rows);

  return data[0];
}

module.exports = {
  getMultiple,
  get,
  getByCat,
  getAllCat
}