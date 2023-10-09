"use strict";
const products = [
  {
    count: 4,
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 2.4,
    title: "apples",
  },
  {
    count: 6,
    description: "Short Product Description3",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    price: 10,
    title: "oranges",
  },
  {
    count: 7,
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
    price: 23,
    title: "grape",
  },
  {
    count: 12,
    description: "Short Product Description7",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "lemons",
  },
  {
    count: 7,
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "peppers",
  },
  {
    count: 8,
    description: "Short Product Description4",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "melons",
  },
  {
    count: 2,
    description: "Short Product Descriptio1",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "watermelons",
  },
  {
    count: 3,
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "avocados",
  },
];

module.exports.getProductsById = async (event) => {
  const { title } = event.pathParameters;
  const product = products.find((product) => product.title === title);

  if (!product) {
    return {
      statusCode: 404,
      body: { message: "Product with this title is not found" },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
