import { getProductsList } from "./get-products-list.js";

export const getProductsById = async (event, context, callback) => {
  const { id } = event.pathParameters;
  console.log(id);
  const products = await getProductsList();
  const product = products.find((product) => product.id === id);
  if (!product) {
    callback(null, {
      statusCode: 404,
      body: { message: "Product with this id is not found" }
    });
  }
  return JSON.stringify(product);
};
