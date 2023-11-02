import { DynamoDBClient, BatchGetItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({ region: 'eu-west-3' });
const docClient = DynamoDBDocumentClient.from(client);

const getProductItems = async () => {
  const command = new ScanCommand({
    ProjectionExpression: '#id, title, description, price',
    ExpressionAttributeNames: { '#id': 'id' },
    TableName: process.env.TABLE_PRODUCTS
  });

  const { Items } = await docClient.send(command);
  return Items;
};

export const getProductsList = async () => {
  const products = await getProductItems();

  const stockParams = {
    RequestItems: {
      stocks: {
        Keys: products.map((product) => ({ product_id: marshall(product.id) }))
      }
    }
  };

  const batchStock = new BatchGetItemCommand(stockParams);
  const stockItems = await docClient.send(batchStock);

  const response = products.map((product) => {
    const productInStock = stockItems.Responses.stocks.find(
      (stock) => marshall(stock).product_id
    );

    return {
      ...product,
      count: unmarshall(productInStock).count
    };
  });
  console.log(response);
  return response;
};
