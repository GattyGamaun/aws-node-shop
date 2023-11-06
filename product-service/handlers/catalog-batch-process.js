import { createProduct } from './create-product.js';

export async function catalogBatchProcess(event) {
  if (!event)
    return {
      statusCode: 400,
      body: JSON.stringify('Records are not found')
    };

  const products = await event.Records.map((records) => {
    const body = JSON.parse(records.body);
    console.log('body', body);
    createProduct(body);
    return body;
  });

  console.log('products', products);

  return {
    statusCode: 200
  };
}
