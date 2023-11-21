'use strict';
require('dotenv').config();

function generatePolicy(principalId, effect, arn) {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: arn
        }
      ]
    }
  };
}

module.exports.basicAuthorizer = async (event) => {
  const {
    routeArn,
    headers: { authorization }
  } = event;

  const [, token] = authorization.split(' ');
  const decoded = Buffer.from(token, 'base64').toString('utf8');
  const [username, password] = decoded.split(':');

  if (username === process.env.USER_NAME && password === process.env.USER_PSW) {
    return generatePolicy(token, 'Allow', routeArn);
  } else {
    return generatePolicy(token, 'Deny', routeArn);
  }
};
