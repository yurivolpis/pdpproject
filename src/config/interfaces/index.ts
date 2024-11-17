import { ENodeEnvironment } from '../enums';

export interface IJwtConfig {
  secret: string;
  expiresIn: number;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;

  url: string;
}

export interface IRedisConfig {
  host: string;
  port: number;
}

export interface IAWSConfig {
  accessKey: string;
  secretAccessKey: string;
  region: string;
  from: string;
}

export interface IConfig {
  nodeEnv: ENodeEnvironment;
  port: number;
  backendUrl: string;
  jwt: IJwtConfig;
  database: IDatabaseConfig;
  redis: IRedisConfig;
  aws: IAWSConfig;
}
