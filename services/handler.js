"use strict";
const { getProductsList } = require("./handlers/get-products-list");
const { getProductsById } = require("./handlers/get-products-by-id");

module.exports = {
  getProductsList: getProductsList,
  getProductsById: getProductsById,
};
