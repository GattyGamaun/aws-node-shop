import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({ region: "eu-west-3" });
const docClient = DynamoDBDocumentClient.from(client);

const writeProduct = async (item) => {
  const command = await new PutCommand({
    TableName: process.env.TABLE_PRODUCTS,
    Item: item
  });

  return await docClient.send(command);
};

const writeCount = async (item) => {
  const command = await new PutCommand({
    TableName: process.env.TABLE_STOCKS,
    Item: item
  });

  return await docClient.send(command);
};

export const createProduct = async (event, context, callback) => {
  const body = JSON.parse(event.body);

  if (!body || !body.title || !body.description || !body.price || !body.count) {
    callback(null, {
      statusCode: 400,
      message: "Please provide title, description, count and price"
    });
  }

  const id = uuidv4();

  const product = {
    id,
    title: body.title,
    description: body.description,
    price: body.price
  };

  const count = {
    product_id: id,
    count: body.count
  };
  await writeProduct(product);
  await writeCount(count);

  return JSON.stringify({
    statusCode: 200,
    message: {
      ...product,
      count: count.count
    }
  });
};
