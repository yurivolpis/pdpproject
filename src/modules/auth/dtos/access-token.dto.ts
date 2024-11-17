import { IAccessToken, IAccessTokenPayload } from '../interfaces';

export class AccessTokenDto implements IAccessToken {
  accessToken: string;
}

export class AccessTokenPayloadDto implements IAccessTokenPayload {
  username: string;
  sub: number;
}
