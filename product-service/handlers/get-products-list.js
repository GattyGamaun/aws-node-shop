import { DynamoDBClient, BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "eu-west-3" });
const docClient = DynamoDBDocumentClient.from(client);

const getProductItems = async () => {
  const command = new ScanCommand({
    ProjectionExpression: "#id, title, description, price",
    ExpressionAttributeNames: { "#id": "id" },
    TableName: process.env.TABLE_PRODUCTS,
  });

  const { Items } = await docClient.send(command);
  return Items;
};

const products = await getProductItems();

const stockParams = {
  RequestItems: {
    stocks: {
      Keys: products.map((product) => ({ product_id: { S: product.id } })),
    },
  },
};

const batchStock = new BatchGetItemCommand(stockParams);
const stockItems = await docClient.send(batchStock);

const response = products.map((product) => {
  const productInStock = stockItems.Responses.stocks.find(
    (stock) => stock["product_id"]["S"],
  );

  return {
    ...product,
    count: parseFloat(productInStock.count["N"]),
  };
});

export const getProductsList = async () => response;
