import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EStrategyName } from '../enums';

@Injectable()
export class JwtGuard extends AuthGuard(EStrategyName.JWT) {}
