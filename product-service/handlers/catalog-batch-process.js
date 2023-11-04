import { createProduct } from './create-product.js';

export async function catalogBatchProcess(event) {
  if (!event)
    return {
      statusCode: 400,
      body: 'Products is not found'
    };
  const { body } = event.Records[0];

  console.log('body', body);
  await createProduct(JSON.parse(body));

  return {
    statusCode: 200,
    body: 'catalogBatchProcess'
  };
}
