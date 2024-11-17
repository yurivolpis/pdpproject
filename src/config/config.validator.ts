import { Type, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  validateSync,
} from 'class-validator';
import { ENodeEnvironment } from './enums';

class EnvironmentVariables {
  @IsEnum(ENodeEnvironment)
  NODE_ENV!: ENodeEnvironment;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN!: string;

  @IsString()
  @IsNotEmpty()
  PG_HOST!: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  PG_PORT!: number;

  @IsString()
  @IsNotEmpty()
  PG_USER!: string;

  @IsString()
  @IsNotEmpty()
  PG_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  PG_NAME!: string;

  @IsString()
  @IsNotEmpty()
  PG_URL!: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST!: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  REDIS_PORT!: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
