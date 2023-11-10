import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { createProduct } from './create-product.js';

export async function catalogBatchProcess(event) {
  const client = new SNSClient({});

  const products = event.Records.map(async (records) => {
    const body = JSON.parse(records.body);
    console.log('body', body);
    await createProduct(body);
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
