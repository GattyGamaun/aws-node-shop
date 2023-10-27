import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'eu-north-1' });

export async function importFileParser(event) {
  const { Records } = event;
  const [record] = Records;
  const bucketName = record.s3.bucket.name;
  const key = record.s3.object.key;

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  try {
    const response = await client.send(command);
    const stream = await response.Body.transformToString();

    console.log('stream', stream);
  } catch (err) {
    console.error(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify('File is uploaded')
  };
}
