'use strict';
require('dotenv').config();

module.exports.basicAuthorizer = async (event) => {
  const {
    headers: { authorization }
  } = event;

  if (!authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Authorization header is not provided'
      })
    };
  }

  const [, token] = authorization.split(' ');
  const decoded = Buffer.from(token, 'base64').toString('utf8');
  const [username, password] = decoded.split(':');

  if (username === process.env.USER_NAME && password === process.env.USER_PSW) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'You have been granted access'
      })
    };
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: 'Access is denied. Unauthorized'
      })
    };
  }
};
