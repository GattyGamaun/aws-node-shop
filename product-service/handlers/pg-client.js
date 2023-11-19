import 'dotenv/config';
import pg from 'pg';

const client = new pg.Client({
  connectionTimeoutMillis: 5000,
  ssl: {
    rejectUnauthorized: false
  }
});
await client.connect();
export const getCarts = async () => {
  const carts = 'carts';
  try {
    const res = await client.query(`select * from ${carts}`);
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
    console.log('client has disconnected');
  }
};
