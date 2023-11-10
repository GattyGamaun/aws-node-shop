import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);
export const getProductsById = async (event, context, callback) => {
  const { id } = event.pathParameters;
  console.log(id);

  const params = {
    Key: marshall({
      id: id
    }),

    TableName: process.env.TABLE_PRODUCTS
  };

  const command = new GetItemCommand(params);
  const { Item } = await docClient.send(command);

  if (!Item) {
    callback(null, {
      statusCode: 404,
      body: { message: 'Product with this id is not found' }
    });
  }
  return unmarshall(Item);
};
