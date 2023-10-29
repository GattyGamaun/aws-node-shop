import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import csv from 'csv-parser';

const client = new S3Client({ region: 'eu-north-1' });
export async function importFileParser(event) {
  const { Records } = event;
  const [record] = Records;
  const bucketName = record.s3.bucket.name;
  const key = record.s3.object.key;
  const params = {
    Bucket: bucketName,
    Key: key
  };
  const command = new GetObjectCommand(params);
  const results = [];

  try {
    const response = await client.send(command);

    response.Body.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        console.log('results', results);
      });
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify('File is uploaded')
  };
}
