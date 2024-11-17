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

export interface IConfig {
  nodeEnv: ENodeEnvironment;
  port: number;
  jwt: IJwtConfig;
  database: IDatabaseConfig;
  redis: IRedisConfig;
}
