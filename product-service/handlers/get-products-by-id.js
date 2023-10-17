import { getProductsList } from "./get-products-list.js";

const getItem = async (event) => {
  const { title } = event.pathParameters;
  const products = await getProductsList();
  const product = products.find((product) => product.title === title);
  if (!product) {
    return {
      statusCode: 404,
      body: { message: "Product with this title is not found" },
    };
  }
  return product;
};

export const getProductsById = async (event) => {
  return await getItem(event);
};
