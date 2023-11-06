import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

const writeProduct = async (item) => {
  const command = new PutCommand({
    TableName: process.env.TABLE_PRODUCTS,
    Item: item
  });

  return await docClient.send(command);
};

const writeCount = async (item) => {
  const command = new PutCommand({
    TableName: process.env.TABLE_STOCKS,
    Item: item
  });

  return await docClient.send(command);
};

export const createProduct = async (event) => {
  if (!event.body) return;

  const body =
    typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  console.log(body);
  const { title, description, price, count } = body;

  if (title && description && price && count) {
    const id = uuidv4();

    const product = {
      id,
      title,
      description,
      price
    };

    const countTable = {
      product_id: id,
      count: count
    };
    try {
      await writeProduct(product);
      await writeCount(countTable);

      return {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Headers': 'Authorization'
        },
        body: JSON.stringify({
          id
        })
      };
    } catch (error) {
      console.log(error);
      return new Error(error.message);
    }
  } else {
    return {
      statusCode: 400,
      body: 'Please provide title, description, count and price'
    };
  }
};
