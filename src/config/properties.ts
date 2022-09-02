import * as dotenv from 'dotenv';

dotenv.config();

export default {
  client: process.env.CLIENT || 'http://localhost:3000',
  server: {
    port: process.env.SERVER_PORT || 8080,
  },
  auth: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '12H',
    bearer: 'Bearer ',
    saltRounds: 10,
    tokenKey: 'token',
  },
};
