import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { createProduct } from './create-product.js';

export async function catalogBatchProcess(event) {
  if (!event)
    return {
      statusCode: 400,
      body: JSON.stringify('Records are not found')
    };
  const client = new SNSClient({});

  const products = await event.Records.map((records) => {
    const body = JSON.parse(records.body);
    console.log('body', body);
    createProduct(body);
    return body;
  });

  const command = new PublishCommand({
    TopicArn: process.env.SNS_ARN,
    Subject: 'Products update',
    Message: `New products have been created ${JSON.stringify(products)}`
  });

  await client.send(command);
  console.log('products', products);

  return {
    statusCode: 200
  };
}
