import { ENodeEnvironment } from './enums';
import { IConfig } from './interfaces';
export * from './config.validator';

export const configure = (): IConfig => ({
  nodeEnv: process.env.NODE_ENV as ENodeEnvironment,
  port: +process.env.PORT,
  backendUrl: process.env.BACKEND_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: +process.env.JWT_EXPIRES_IN,
  },
  database: {
    host: process.env.PG_HOST,
    port: +process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    name: process.env.PG_NAME,
    url: process.env.PG_URL,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
  },
  aws: {
    accessKey: process.env.SES_ACCESS_KEY,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
    region: process.env.SES_REGION,
    from: process.env.SES_FROM,
  },
});
