import https from 'https';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const createPresignedUrl = (fileName) => {
  const s3Client = new S3Client({ region: 'eu-north-1' });
  const bucketName = 'import-service-gatty';

  const key = `uploaded/${fileName}`;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key
  });

  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

function put(url, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Length': new Blob([data]).size
        }
      },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        res.on('end', () => {
          resolve(responseBody);
        });
      }
    );
    req.on('error', (err) => {
      reject(err);
    });
    req.write(data);
    req.end();
  });
}
export async function importProductsFile(event) {
  const { name } = event?.queryStringParameters;
  try {
    const signedUrl = await createPresignedUrl(name);

    await put(signedUrl, name);

    return JSON.stringify(signedUrl);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      })
    };
  }
}
